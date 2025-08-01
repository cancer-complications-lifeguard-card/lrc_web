import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// 数据文件路径
const dataFilePath = path.join(process.cwd(), 'db', 'visit-data.json');

// 本地数据存储（用于开发环境和构建环境）
let localVisitData = {
  todayCount: 0,
  totalCount: 0,
  servedPatients: 0,
  date: new Date().toDateString()
};

// 从文件加载数据
function loadLocalData() {
  try {
    if (fs.existsSync(dataFilePath)) {
      const rawData = fs.readFileSync(dataFilePath, 'utf8');
      const data = JSON.parse(rawData);
      localVisitData = { ...localVisitData, ...data };
    }
  } catch (error) {
    console.warn('Failed to load local data:', error);
  }
}

// 保存数据到文件
function saveLocalData() {
  try {
    const dbDir = path.dirname(dataFilePath);
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(localVisitData, null, 2));
    console.log('Local data saved successfully to:', dataFilePath);
  } catch (error) {
    console.warn('Failed to save local data (using in-memory only):', error);
    // 在容器环境中，如果无法写入文件，我们仍然可以使用内存数据
  }
}

// 初始化时加载数据
loadLocalData();

export async function GET() {
  try {
    console.log('GET request - Environment check:', {
      NODE_ENV: process.env.NODE_ENV,
      SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + '...',
      HAS_SUPABASE_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    });

    // 优先尝试使用 Supabase（无论什么环境）
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      try {
        const { supabase } = await import('@/lib/supabase');
        const { data, error } = await supabase.functions.invoke('get-visit-stats');
        
        if (!error && data) {
          console.log('Successfully retrieved data from Supabase');
          return NextResponse.json({
            success: true,
            todayCount: data?.todayVisits || 0,
            totalCount: data?.totalVisits || 0,
            servedPatients: data?.servedPatients || 0,
            date: new Date().toDateString()
          });
        } else {
          console.warn('Supabase get-visit-stats failed:', error);
        }
      } catch (supabaseError) {
        console.warn('Supabase connection failed, using local data:', supabaseError);
      }
    } else {
      console.warn('Supabase URL not configured, using local data');
    }

    // 使用本地数据作为回退
    return NextResponse.json({
      success: true,
      ...localVisitData
    });
  } catch (error) {
    console.error('Error getting visit count:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get visit count' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // 优先尝试使用 Supabase（无论什么环境）
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      try {
        const { supabase } = await import('@/lib/supabase');
        const { searchParams } = new URL(request.url);
        const date = searchParams.get('date') || new Date().toISOString().split('T')[0];
        const userAgent = request.headers.get('user-agent') || 'Unknown';

        const { data, error } = await supabase.functions.invoke('increment-visit', {
          body: { date, userAgent }
        });

        if (!error && data) {
          const clientIP = request.headers.get('x-forwarded-for') || 
                         request.headers.get('x-real-ip') || 
                         'unknown';

          console.log(`Supabase visit from ${clientIP}. Today: ${data?.todayVisits || 0}, Total: ${data?.totalVisits || 0}`);

          return NextResponse.json({
            success: true,
            todayCount: data?.todayVisits || 0,
            totalCount: data?.totalVisits || 0,
            servedPatients: data?.servedPatients || 0,
            date: new Date().toDateString()
          });
        } else {
          console.warn('Supabase increment-visit failed:', error);
        }
      } catch (supabaseError) {
        console.warn('Supabase connection failed, using local data:', supabaseError);
      }
    } else {
      console.warn('Supabase URL not configured, using local data');
    }

    // 使用本地数据作为回退
    const today = new Date().toDateString();
    if (localVisitData.date !== today) {
      localVisitData = {
        todayCount: 1,
        totalCount: localVisitData.totalCount + 1,
        servedPatients: localVisitData.servedPatients + 1,
        date: today
      };
    } else {
      localVisitData.todayCount++;
      localVisitData.totalCount++;
      localVisitData.servedPatients++;
    }

    // 保存到文件以确保持久化
    saveLocalData();

    const clientIP = request.headers.get('x-forwarded-for') || 
                   request.headers.get('x-real-ip') || 
                   'unknown';

    console.log(`New visit from ${clientIP}. Today: ${localVisitData.todayCount}, Total: ${localVisitData.totalCount}`);

    return NextResponse.json({
      success: true,
      ...localVisitData
    });
  } catch (error) {
    console.error('Error updating visit count:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update visit count' },
      { status: 500 }
    );
  }
}