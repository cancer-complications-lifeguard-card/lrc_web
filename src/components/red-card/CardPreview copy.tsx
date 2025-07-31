"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Share2, 
  Heart, 
  AlertTriangle, 
  Phone, 
  MapPin, 
  User,
  Activity,
  Clock,
  Shield,
  FileText
} from "lucide-react";

interface MedicalInfo {
  name: string;
  age: string;
  bloodType: string;
  mainDiagnosis: string;
  surgeryHistory: string;
  allergies: string;
  otherDiseases: string;
  isOnAnticoagulation: boolean;
  medicationType: string;
  lastTaken: string;
  stopReason: string;
}

interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

interface Hospital {
  name: string;
  emergency: string;
  address: string;
  features: string;
}

interface CardPreviewProps {
  selectedComplications: string[];
  medicalInfo: MedicalInfo;
  emergencyContacts: EmergencyContact[];
  hospitals: Hospital[];
  nursingServices?: Array<{
    provider: string;
    contact: string;
    price: string;
    features: string;
  }>;
  symptomRecords?: Array<{
    date: string;
    symptom: string;
    severity: string;
    description: string;
  }>;
}

export default function CardPreview({ 
  selectedComplications, 
  medicalInfo, 
  emergencyContacts, 
  hospitals,
  nursingServices = [],
  symptomRecords = []
}: CardPreviewProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const getEmergencyGuidance = () => {
    const guidance: Array<{
      title: string;
      steps: string[];
      warnings: string[];
      emergencyCall?: string;
      criticalInfo?: string[];
    }> = [];
    
    if (selectedComplications.includes('bleeding')) {
      guidance.push({
        title: '消化道出血急救',
        steps: [
          '立即拨打120，告知消化道出血',
          '绝对禁食禁水，保持呼吸道通畅',
          '侧卧位，防止呕吐物误吸',
          '记录呕血和黑便的量、颜色和时间',
          '保存呕吐物样本，供医生查看'
        ],
        warnings: [
          '禁止使用止痛药，可能掩盖症状',
          '禁止热敷腹部，可能加重出血',
          '禁止自行服用止血药'
        ]
      });
    }
    
    if (selectedComplications.includes('obstruction')) {
      guidance.push({
        title: '肠梗阻急救',
        steps: [
          '立即拨打120，告知肠梗阻症状',
          '绝对禁食禁水，减轻肠道负担',
          '禁止催吐，防止肠道穿孔',
          '禁止使用止痛药，避免掩盖症状',
          '禁止热敷腹部，防止肠管扩张',
          '侧卧位，保持呼吸道通畅',
          '记录腹痛性质、呕吐次数和腹胀程度',
          '准备身份证、医保卡、既往病历资料'
        ],
        warnings: [
          '禁止按摩腹部，可能导致肠穿孔',
          '禁止使用泻药或灌肠，加重肠管损伤',
          '禁止进食任何食物或液体',
          '禁止剧烈活动，防止病情加重',
          '禁止自行服用药物，特别是止痛药'
        ],
        emergencyCall: '您好，这里是肠梗阻急救，患者[姓名]，[年龄]岁[性别]，[既往病史]。现在出现[具体症状：剧烈腹痛/呕吐不止/停止排气排便]，可能需要紧急手术。地址是[具体地址]，联系电话[电话号码]。请尽快派救护车！',
        criticalInfo: [
          '血型：[血型]',
          '年龄：[年龄]岁',
          '诊断：[主要疾病]',
          '特殊风险：[相关风险因素]',
          '药物过敏：[过敏史]',
          '7天内抗凝治疗：[是/否]'
        ]
      });
    }
    
    if (selectedComplications.includes('biliary')) {
      guidance.push({
        title: '胆道梗阻急救',
        steps: [
          '立即拨打120，告知黄疸、发热症状',
          '绝对禁食禁水，减轻肝脏负担',
          '记录体温变化，监测发热规律',
          '观察皮肤和巩膜黄染程度',
          '记录腹痛性质和部位变化'
        ],
        warnings: [
          '禁止使用对肝脏有损害的药物',
          '禁止饮酒，加重肝脏负担',
          '禁止高脂饮食，加重胆道负担'
        ]
      });
    }
    
    if (selectedComplications.includes('infection')) {
      guidance.push({
        title: '感染急救',
        steps: [
          '立即拨打120，告知高热、感染症状',
          '保持休息，减少体力消耗',
          '补充水分，防止脱水',
          '记录体温变化和发热规律',
          '观察有无寒战、出汗等症状'
        ],
        warnings: [
          '禁止自行使用抗生素，可能导致耐药',
          '禁止捂汗，可能加重高热',
          '禁止擅自降温，可能掩盖病情'
        ]
      });
    }
    
    if (selectedComplications.includes('ascites')) {
      guidance.push({
        title: '腹水急救',
        steps: [
          '立即拨打120，告知严重腹胀、呼吸困难',
          '半坐卧位，减轻呼吸困难',
          '限制水分和盐分摄入',
          '记录腹围变化，观察腹胀程度',
          '测量体重变化，监测腹水增减'
        ],
        warnings: [
          '禁止大量饮水，加重腹水',
          '禁止高盐饮食，增加水钠潴留',
          '禁止腹部按摩，可能导致不适'
        ]
      });
    }
    
    if (selectedComplications.includes('thrombosis')) {
      guidance.push({
        title: '血栓急救',
        steps: [
          '立即拨打120，告知肢体肿胀、疼痛',
          '保持患肢休息，避免活动',
          '抬高患肢，减轻肿胀和疼痛',
          '记录肢体肤色和温度变化',
          '避免按摩患处，防止血栓脱落'
        ],
        warnings: [
          '禁止热敷患处，可能加重血栓',
          '禁止剧烈运动，可能导致血栓脱落',
          '禁止自行服用抗凝药，可能导致出血'
        ]
      });
    }
    
    return guidance;
  };

  const getDiagnosisGuidance = () => {
    const guidance: Array<{
      title: string;
      points: string[];
      riskFactors?: string[];
      monitoringTable?: {
        title: string;
        fields: string[];
      };
    }> = [];
    
    if (selectedComplications.includes('bleeding')) {
      guidance.push({
        title: '消化道出血诊断要点',
        points: [
          '呕血颜色：鲜红色提示活动性出血，咖啡色提示出血较慢或已停止',
          '黑便：柏油样便提示上消化道出血，暗红色便提示下消化道出血',
          '生命体征：心率增快、血压下降提示失血较多',
          '伴随症状：头晕、心慌、出冷汗提示休克前期'
        ]
      });
    }
    
    if (selectedComplications.includes('obstruction')) {
      guidance.push({
        title: '肠梗阻诊断要点',
        points: [
          '腹痛：阵发性绞痛提示机械性梗阻，持续性胀痛提示麻痹性梗阻',
          '呕吐：呕吐物含胆汁提示高位梗阻，含粪样物质提示低位梗阻',
          '腹胀：腹部膨隆，可见肠型和蠕动波',
          '停止排气排便：完全性肠梗阻的典型表现',
          '腹部X线：可见液气平面和肠管扩张',
          '生命体征：心率增快、血压下降提示休克',
          '腹部体征：肌紧张、反跳痛提示肠坏死或穿孔',
          '实验室检查：白细胞升高、电解质紊乱'
        ],
        riskFactors: [
          '🔴 高危风险信号（立即呼叫120）：',
          '  • 剧烈腹痛伴肌紧张',
          '  • 呕吐物呈粪便样',
          '  • 腹胀明显伴停止排气排便>24小时',
          '  • 发热>38.5°C',
          '  • 血压下降、心率增快',
          '  • 腹部触及明显包块',
          '  • 腹膜刺激征阳性',
          '',
          '🟡 中等风险管理（密切观察，准备就医）：',
          '  • 阵发性腹痛',
          '  • 间断呕吐',
          '  • 腹胀但仍有少量排气',
          '  • 轻度发热',
          '  • 食欲完全消失',
          '',
          '🟢 低风险监护（居家观察，定期复查）：',
          '  • 轻度腹胀不适',
          '  • 排便困难但仍有排气',
          '  • 食欲减退',
          '  • 无明显腹痛'
        ],
        monitoringTable: {
          title: '症状记录表',
          fields: [
            '日期时间：_________',
            '腹痛症状：',
            '  - 阵发性腹痛（间隔时间：_______）',
            '  - 持续性腹痛（疼痛程度：_______/10分）',
            '  - 腹痛部位：_______',
            '呕吐情况：',
            '  - 次数：_______次',
            '  - 性质：[ ] 胃内容物 [ ] 胆汁样 [ ] 粪便样',
            '  - 量：_______ml',
            '排便排气：',
            '  - 最后排便时间：_______',
            '  - 最后排气时间：_______',
            '  - 大便性状：_______',
            '腹胀情况：',
            '  - 腹胀程度：[ ] 轻度 [ ] 中度 [ ] 重度',
            '  - 是否可见肠型：[ ] 是 [ ] 否',
            '生命体征：',
            '  - 血压：_______mmHg',
            '  - 心率：_______次/分',
            '  - 体温：_______°C',
            '  - 呼吸：_______次/分'
          ]
        }
      });
    }
    
    if (selectedComplications.includes('biliary')) {
      guidance.push({
        title: '胆道梗阻诊断要点',
        points: [
          '黄疸：皮肤和巩膜黄染，尿色加深，大便颜色变浅',
          '腹痛：右上腹持续性胀痛，可向右肩放射',
          '发热：提示合并感染，如胆管炎',
          'Charcot三联征：腹痛、寒战高热、黄疸提示急性胆管炎',
          '实验室检查：总胆红素、直接胆红素升高，碱性磷酸酶升高'
        ]
      });
    }
    
    if (selectedComplications.includes('infection')) {
      guidance.push({
        title: '感染诊断要点',
        points: [
          '体温：持续高热或体温不升',
          '血常规：白细胞计数升高，中性粒细胞比例升高',
          'C反应蛋白：明显升高',
          '降钙素原：严重细菌感染时升高',
          '感染灶：局部红肿热痛，或有分泌物'
        ]
      });
    }
    
    if (selectedComplications.includes('ascites')) {
      guidance.push({
        title: '腹水诊断要点',
        points: [
          '腹胀：腹部膨隆，腹围增加',
          '移动性浊音：体位改变时浊音区移动',
          '液波震颤：大量腹水时出现',
          '超声检查：腹腔内游离液体',
          '腹水检查：明确腹水性质（漏出液、渗出液）'
        ]
      });
    }
    
    if (selectedComplications.includes('thrombosis')) {
      guidance.push({
        title: '血栓诊断要点',
        points: [
          '肢体肿胀：单侧肢体明显肿胀',
          '疼痛：肢体胀痛或压痛',
          '皮肤温度：患肢皮肤温度升高',
          '皮肤颜色：患肢皮肤发红或发绀',
          '血管超声：可见血管内血栓形成'
        ]
      });
    }
    
    return guidance;
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      if (cardRef.current) {
        // 使用html2canvas来生成完整的图片
        const html2canvas = (await import('html2canvas')).default;
        const canvas = await html2canvas(cardRef.current, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          width: cardRef.current.scrollWidth,
          height: cardRef.current.scrollHeight
        });
        
        // 创建下载链接
        const link = document.createElement('a');
        link.download = `小红卡-${medicalInfo.name || '未命名'}-${new Date().toLocaleDateString('zh-CN')}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
    } catch (error) {
      console.error('生成图片失败:', error);
      // 如果html2canvas失败，使用备用方案
      try {
        if (cardRef.current) {
          // 创建一个简单的canvas来模拟图片生成
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            throw new Error('无法创建canvas上下文');
          }
          
          // 设置canvas尺寸，增加高度以包含更多内容
          canvas.width = 800;
          canvas.height = 4000; // 大幅增加高度以包含所有模块
          
          // 设置背景色
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // 绘制标题栏
          ctx.fillStyle = '#ef4444';
          ctx.fillRect(0, 0, canvas.width, 100);
          
          // 绘制标题文字
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 32px Arial';
          ctx.fillText('小红卡', 50, 40);
          ctx.font = '20px Arial';
          ctx.fillText('并发症管理指引', 50, 70);
          
          // 绘制生成时间
          ctx.font = '16px Arial';
          ctx.fillText(`生成时间: ${new Date().toLocaleDateString('zh-CN')}`, canvas.width - 200, 70);
          
          // 绘制患者信息
          ctx.fillStyle = '#000000';
          ctx.font = 'bold 20px Arial';
          ctx.fillText('患者信息', 50, 140);
          
          ctx.font = '16px Arial';
          ctx.fillText(`姓名: ${medicalInfo.name || '未填写'}`, 50, 170);
          ctx.fillText(`年龄: ${medicalInfo.age || '未填写'}`, 250, 170);
          ctx.fillText(`血型: ${medicalInfo.bloodType || '未填写'}`, 450, 170);
          ctx.fillText(`主要诊断: ${medicalInfo.mainDiagnosis || '未填写'}`, 50, 200);
          
          let yPos = 240;
          
          // 绘制急救指引
          ctx.fillStyle = '#ef4444';
          ctx.font = 'bold 20px Arial';
          ctx.fillText('🆘 急救指导步骤', 50, yPos);
          yPos += 30;
          
          ctx.fillStyle = '#000000';
          ctx.font = '16px Arial';
          
          emergencyGuidance.forEach((guide) => {
            ctx.font = 'bold 18px Arial';
            ctx.fillText(guide.title, 50, yPos);
            yPos += 30;
            
            ctx.font = '16px Arial';
            ctx.fillText('处理步骤：', 50, yPos);
            yPos += 25;
            
            guide.steps.forEach((step) => {
              ctx.fillText(`• ${step}`, 70, yPos);
              yPos += 25;
            });
            
            ctx.fillText('注意事项：', 50, yPos);
            yPos += 25;
            
            guide.warnings.forEach((warning) => {
              ctx.fillText(`• ${warning}`, 70, yPos);
              yPos += 25;
            });
            
            yPos += 20;
            
            // 添加120话术
            if (guide.emergencyCall) {
              ctx.fillStyle = '#3b82f6';
              ctx.font = 'bold 16px Arial';
              ctx.fillText('📞 120急救话术模板', 50, yPos);
              yPos += 25;
              
              ctx.fillStyle = '#000000';
              ctx.font = '14px Arial';
              const callText = guide.emergencyCall.replace(/\[姓名\]/g, medicalInfo.name || '未填写')
                .replace(/\[年龄\]/g, medicalInfo.age || '未填写')
                .replace(/\[血型\]/g, medicalInfo.bloodType || '未填写')
                .replace(/\[主要疾病\]/g, medicalInfo.mainDiagnosis || '未填写')
                .replace(/\[过敏史\]/g, medicalInfo.allergies || '未填写')
                .replace(/\[既往病史\]/g, medicalInfo.surgeryHistory || '未填写');
              
              // 分行显示长文本
              const words = callText.split('');
              let line = '';
              for (let n = 0; n < words.length; n++) {
                const testLine = line + words[n];
                const metrics = ctx.measureText(testLine);
                const testWidth = metrics.width;
                if (testWidth > 700 && n > 0) {
                  ctx.fillText(line, 70, yPos);
                  line = words[n];
                  yPos += 20;
                } else {
                  line = testLine;
                }
              }
              ctx.fillText(line, 70, yPos);
              yPos += 25;
            }
            
            // 添加关键信息卡
            if (guide.criticalInfo) {
              ctx.fillStyle = '#eab308';
              ctx.font = 'bold 16px Arial';
              ctx.fillText('🔴 关键信息卡', 50, yPos);
              yPos += 25;
              
              ctx.fillStyle = '#000000';
              ctx.font = '14px Arial';
              guide.criticalInfo.forEach((info) => {
                const infoText = info.replace(/\[姓名\]/g, medicalInfo.name || '未填写')
                  .replace(/\[年龄\]/g, medicalInfo.age || '未填写')
                  .replace(/\[血型\]/g, medicalInfo.bloodType || '未填写')
                  .replace(/\[主要疾病\]/g, medicalInfo.mainDiagnosis || '未填写')
                  .replace(/\[过敏史\]/g, medicalInfo.allergies || '未填写')
                  .replace(/\[相关风险因素\]/g, medicalInfo.otherDiseases || '未填写')
                  .replace(/\[是\/否\]/g, medicalInfo.isOnAnticoagulation ? '是' : '否');
                
                ctx.fillText(infoText, 70, yPos);
                yPos += 20;
              });
              yPos += 10;
            }
          });
          
          // 绘制诊断指引
          if (diagnosisGuidance.length > 0) {
            ctx.fillStyle = '#3b82f6';
            ctx.font = 'bold 20px Arial';
            ctx.fillText('🔍 病情诊断关键指引', 50, yPos);
            yPos += 30;
            
            ctx.fillStyle = '#000000';
            ctx.font = '16px Arial';
            
            diagnosisGuidance.forEach((guide) => {
              ctx.font = 'bold 18px Arial';
              ctx.fillText(guide.title, 50, yPos);
              yPos += 30;
              
              ctx.font = '16px Arial';
              guide.points.forEach((point) => {
                ctx.fillText(`• ${point}`, 70, yPos);
                yPos += 25;
              });
              
              yPos += 20;
              
              // 添加风险因素
              if (guide.riskFactors) {
                ctx.fillStyle = '#ef4444';
                ctx.font = 'bold 16px Arial';
                ctx.fillText('⚠️ 风险评估体系', 50, yPos);
                yPos += 25;
                
                ctx.fillStyle = '#000000';
                ctx.font = '14px Arial';
                guide.riskFactors.forEach((factor) => {
                  if (factor.includes('🔴') || factor.includes('🟡') || factor.includes('🟢')) {
                    ctx.fillStyle = factor.includes('🔴') ? '#ef4444' : factor.includes('🟡') ? '#eab308' : '#10b981';
                    ctx.font = 'bold 14px Arial';
                  } else {
                    ctx.fillStyle = '#000000';
                    ctx.font = '14px Arial';
                  }
                  ctx.fillText(factor, 70, yPos);
                  yPos += 20;
                });
                yPos += 10;
              }
              
              // 添加监测表格
              if (guide.monitoringTable) {
                ctx.fillStyle = '#10b981';
                ctx.font = 'bold 16px Arial';
                ctx.fillText(guide.monitoringTable.title, 50, yPos);
                yPos += 25;
                
                ctx.fillStyle = '#000000';
                ctx.font = '14px Arial';
                guide.monitoringTable.fields.forEach((field) => {
                  ctx.fillText(field, 70, yPos);
                  yPos += 20;
                });
                yPos += 10;
              }
            });
          }
          
          // 绘制日常注意和预防
          ctx.fillStyle = '#10b981';
          ctx.font = 'bold 20px Arial';
          ctx.fillText('🏠 日常注意和预防', 50, yPos);
          yPos += 30;
          
          ctx.fillStyle = '#000000';
          ctx.font = '16px Arial';
          ctx.fillText('🍎 饮食管理', 50, yPos);
          yPos += 25;
          ctx.fillText('推荐食物：流质食物、半流质、易消化蛋白、温热饮品', 70, yPos);
          yPos += 25;
          ctx.fillText('避免食物：难消化食物、高纤维食物、坚硬食物、易胀气食物', 70, yPos);
          yPos += 30;
          
          ctx.fillText('💊 用药安全指导', 50, yPos);
          yPos += 25;
          ctx.fillText('需谨慎使用：阿片类止痛药、抗胆碱药物、某些抗抑郁药、钙通道阻滞剂', 70, yPos);
          yPos += 30;
          
          ctx.fillText('🏃‍♂️ 运动和生活方式', 50, yPos);
          yPos += 25;
          ctx.fillText('适宜活动：餐后散步、腹式呼吸、轻柔按摩、适度瑜伽', 70, yPos);
          yPos += 25;
          ctx.fillText('避免活动：剧烈运动、重体力劳动、久坐卧床、腹部按压', 70, yPos);
          yPos += 30;
          
          ctx.fillText('📅 定期监测指标', 50, yPos);
          yPos += 25;
          ctx.fillText('每周：排便频率、腹胀程度、食欲体重、腹痛情况', 70, yPos);
          yPos += 25;
          ctx.fillText('每月：腹部CT/B超、血常规生化、肿瘤标志物、营养评估', 70, yPos);
          yPos += 30;
          
          // 绘制辅助服务
          if (emergencyContacts.length > 0 || hospitals.length > 0) {
            ctx.fillStyle = '#10b981';
            ctx.font = 'bold 20px Arial';
            ctx.fillText('🤝 辅助服务', 50, yPos);
            yPos += 30;
            
            ctx.fillStyle = '#000000';
            ctx.font = '16px Arial';
            
            if (emergencyContacts.length > 0) {
              ctx.fillText('紧急联系人：', 50, yPos);
              yPos += 25;
              emergencyContacts.forEach((contact) => {
                ctx.fillText(`• ${contact.name} (${contact.relationship}) - ${contact.phone}`, 70, yPos);
                yPos += 25;
              });
            }
            
            if (hospitals.length > 0) {
              ctx.fillText('医院信息：', 50, yPos);
              yPos += 25;
              hospitals.forEach((hospital) => {
                ctx.fillText(`• ${hospital.name} - 急诊: ${hospital.emergency}`, 70, yPos);
                yPos += 25;
                ctx.fillText(`  地址: ${hospital.address}`, 70, yPos);
                yPos += 25;
              });
            }
          }
          
          // 绘制个人医疗信息卡
          ctx.fillStyle = '#8b5cf6';
          ctx.font = 'bold 20px Arial';
          ctx.fillText('📋 个人医疗信息卡', 50, yPos);
          yPos += 30;
          
          ctx.fillStyle = '#000000';
          ctx.font = '16px Arial';
          ctx.fillText(`姓名: ${medicalInfo.name || '未填写'}  血型: ${medicalInfo.bloodType || '未填写'}`, 50, yPos);
          yPos += 25;
          ctx.fillText(`年龄: ${medicalInfo.age || '未填写'}  联系电话: ${emergencyContacts.length > 0 ? emergencyContacts[0].phone : '未填写'}`, 50, yPos);
          yPos += 25;
          ctx.fillText(`主要诊断: ${medicalInfo.mainDiagnosis || '未填写'}`, 50, yPos);
          yPos += 25;
          
          // 绘制医学术语速查表
          if (medicalTerminology.length > 0) {
            ctx.fillStyle = '#6366f1';
            ctx.font = 'bold 20px Arial';
            ctx.fillText('📚 医学术语速查表', 50, yPos);
            yPos += 30;
            
            ctx.fillStyle = '#000000';
            ctx.font = '16px Arial';
            
            medicalTerminology.forEach(category => {
              // 绘制分类标题
              ctx.fillStyle = '#4f46e5';
              ctx.font = 'bold 18px Arial';
              ctx.fillText(category.title, 50, yPos);
              yPos += 25;
              
              // 绘制术语内容
              ctx.fillStyle = '#000000';
              ctx.font = '14px Arial';
              category.items.forEach(item => {
                ctx.fillText(`${item.term}：${item.definition}（${item.significance}）`, 70, yPos);
                yPos += 20;
              });
              yPos += 10;
            });
          }
          
          // 绘制页脚
          ctx.fillStyle = '#6b7280';
          ctx.font = '14px Arial';
          ctx.fillText('© 2024 小红卡 - 为您的健康保驾护航', 50, yPos);
          yPos += 20;
          ctx.fillText('由小红卡开源社区 x 小x宝社区联合提供公益服务', 50, yPos);
          
          // 创建下载链接
          const link = document.createElement('a');
          link.download = `小红卡-${medicalInfo.name || '未命名'}-${new Date().toLocaleDateString('zh-CN')}.png`;
          link.href = canvas.toDataURL('image/png');
          link.click();
        }
      } catch (fallbackError) {
        console.error('备用图片生成也失败:', fallbackError);
        alert('图片生成失败，请重试或联系技术支持');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = () => {
    // 模拟分享功能
    if (navigator.share) {
      navigator.share({
        title: '我的小红卡',
        text: '并发症管理指引卡片',
        url: window.location.href
      });
    } else {
      alert('分享功能已准备就绪！');
    }
  };

  const getDailyCareGuidance = () => {
    const guidance: Array<{
      title: string;
      dietManagement?: {
        recommended: string[];
        avoided: string[];
      };
      medicationSafety?: string[];
      activityGuidance?: {
        recommended: string[];
        avoided: string[];
      };
      monitoringIndicators?: string[];
      specialNotes?: string[];
    }> = [];
    
    if (selectedComplications.includes('bleeding')) {
      guidance.push({
        title: '消化道出血日常管理',
        dietManagement: {
          recommended: [
            '流质食物：米汤、蛋花汤、清汤面条',
            '半流质：稀粥、蒸蛋羹、软烂面条',
            '易消化蛋白：鱼肉、鸡蛋、豆腐',
            '温热饮品：温开水、淡茶水、温牛奶'
          ],
          avoided: [
            '坚果类：花生、核桃、瓜子（可刺破曲张静脉）',
            '尖锐食物：鱼刺、骨头、鸡爪',
            '粗糙食物：韭菜、芹菜、豆芽',
            '油炸食品：炸鸡、薯片（硬脆外壳）',
            '带皮水果：苹果皮、梨皮',
            '酒精和刺激性食物'
          ]
        },
        medicationSafety: [
          '避免使用：阿司匹林、布洛芬、华法林等',
          '7天内服用过的药物需告知医生',
          '任何新药使用前咨询医生',
          '避免使用抗抑郁药SSRIs'
        ],
        monitoringIndicators: [
          '每日观察：大便颜色、性质',
          '每周监测：血压、心率',
          '定期检查：血常规、肝功能',
          '注意症状：头晕、心慌、出冷汗'
        ],
        specialNotes: [
          '家中常备：血压计、体温计、手电筒',
          '提前联系：主治医生、急诊科',
          '定期更新：医生联系方式、验血报告',
          '门脉高压患者需特别注意饮食安全'
        ]
      });
    }
    
    if (selectedComplications.includes('obstruction')) {
      guidance.push({
        title: '肠梗阻日常管理',
        dietManagement: {
          recommended: [
            '流质食物：米汤、蛋花汤、清汤面条',
            '半流质：稀粥、蒸蛋羹、软烂面条',
            '易消化蛋白：鱼肉、鸡蛋、豆腐',
            '温热饮品：温开水、淡茶水、温牛奶'
          ],
          avoided: [
            '难消化食物：糯米、年糕、粽子、汤圆',
            '高纤维食物：芹菜、韭菜、豆皮、玉米',
            '坚硬食物：坚果、硬糖、骨头',
            '易胀气食物：豆类、洋葱、碳酸饮料',
            '冰冷食物：冰淇淋、冰水、冷饮'
          ]
        },
        medicationSafety: [
          '避免使用：阿片类止痛药（减慢肠蠕动）',
          '谨慎使用：抗胆碱药物（654-2、阿托品等）',
          '注意药物：钙通道阻滞剂',
          '任何新药使用前咨询医生'
        ],
        activityGuidance: {
          recommended: [
            '餐后散步（30分钟后）',
            '腹式呼吸练习',
            '轻柔的腹部按摩（顺时针）',
            '适度的瑜伽伸展'
          ],
          avoided: [
            '剧烈运动（跑步、跳跃）',
            '重体力劳动',
            '长时间久坐或卧床',
            '腹部剧烈按压'
          ]
        },
        monitoringIndicators: [
          '每日观察：排便频率、腹胀程度',
          '每周检查：腹痛情况、食欲变化',
          '定期复查：腹部CT或B超',
          '注意症状：停止排气、呕吐重新出现'
        ],
        specialNotes: [
          '肠梗阻会多次出现，第一次处理大致一样',
          '手术难度逐次增加，需要经验丰富的医生',
          '二级医院成立了肠梗阻专科，但口碑参差不齐',
          '复发梗阻可考虑有经验的专科医生'
        ]
      });
    }
    
    if (selectedComplications.includes('biliary')) {
      guidance.push({
        title: '胆道梗阻日常管理',
        dietManagement: {
          recommended: [
            '低脂饮食：清淡、易消化的食物',
            '高蛋白：鱼肉、鸡胸肉、豆腐',
            '新鲜蔬菜：煮熟的蔬菜',
            '充足水分：温开水、淡茶'
          ],
          avoided: [
            '高脂食物：油炸食品、肥肉',
            '辛辣刺激：辣椒、酒精',
            '胆固醇高：动物内脏、蛋黄',
            '难消化：坚果、粗糙食物'
          ]
        },
        medicationSafety: [
          '避免使用：对肝脏有损害的药物',
          '谨慎使用：解热镇痛药',
          '定期监测：肝功能指标',
          '中药使用需咨询医生'
        ],
        monitoringIndicators: [
          '每日观察：皮肤颜色、尿色变化',
          '每周监测：体温、食欲情况',
          '定期检查：肝功能、腹部B超',
          '注意症状：腹痛、黄疸、发热'
        ]
      });
    }
    
    if (selectedComplications.includes('infection')) {
      guidance.push({
        title: '感染日常管理',
        dietManagement: {
          recommended: [
            '高蛋白：鸡蛋、鱼肉、瘦肉',
            '丰富维生素：新鲜水果蔬菜',
            '充足水分：温开水、汤类',
            '易消化：粥类、面条'
          ],
          avoided: [
            '生冷食物：生鱼片、生肉',
            '不洁食物：街头小吃',
            '过度加工：罐头、腌制食品',
            '刺激性食物：辛辣、酒精'
          ]
        },
        medicationSafety: [
          '避免自行使用抗生素',
          '按时完成处方抗生素疗程',
          '注意药物过敏反应',
          '定期复查血常规'
        ],
        monitoringIndicators: [
          '每日监测：体温变化',
          '观察症状：感染部位红肿热痛',
          '注意体征：寒战、出汗',
          '定期检查：血常规、C反应蛋白'
        ]
      });
    }
    
    if (selectedComplications.includes('ascites')) {
      guidance.push({
        title: '腹水日常管理',
        dietManagement: {
          recommended: [
            '低盐饮食：每日盐分<3g',
            '优质蛋白：鱼肉、鸡蛋、瘦肉',
            '适量水分：控制每日液体摄入',
            '易消化：软烂、清淡食物'
          ],
          avoided: [
            '高盐食物：咸菜、腊肉',
            '大量饮水：超过医生建议量',
            '酒精饮料：加重肝脏负担',
            '难消化：油腻、粗糙食物'
          ]
        },
        medicationSafety: [
          '按时服用利尿剂',
          '监测电解质平衡',
          '避免使用肾毒性药物',
          '定期复查肝肾功能'
        ],
        activityGuidance: {
          recommended: [
            '轻度活动：短距离散步',
            '休息时抬高下肢',
            '避免长时间站立',
            '半坐卧位休息'
          ],
          avoided: [
            '剧烈运动',
            '重体力劳动',
            '长时间久坐',
            '腹部压迫'
          ]
        },
        monitoringIndicators: [
          '每日测量：体重、腹围',
          '观察症状：呼吸困难程度',
          '注意体征：下肢水肿',
          '定期检查：腹部B超、电解质'
        ]
      });
    }
    
    if (selectedComplications.includes('thrombosis')) {
      guidance.push({
        title: '血栓日常管理',
        dietManagement: {
          recommended: [
            '清淡饮食：蔬菜、水果',
            '富含纤维：全谷物、豆类',
            '适量蛋白：鱼肉、瘦肉',
            '充足水分：每日2000ml左右'
          ],
          avoided: [
            '高脂食物：动物内脏、油炸食品',
            '高糖食物：甜点、饮料',
            '过量维生素K：深绿色蔬菜',
            '酒精：影响药物代谢'
          ]
        },
        medicationSafety: [
          '按时服用抗凝药物',
          '定期监测凝血功能',
          '避免自行调整药量',
          '注意药物相互作用'
        ],
        activityGuidance: {
          recommended: [
            '适度运动：散步、游泳',
            '避免久坐：每小时活动5分钟',
            '穿弹力袜：预防深静脉血栓',
            '肢体按摩：轻柔按摩'
          ],
          avoided: [
            '剧烈运动',
            '长时间静止不动',
            '过度劳累',
            '肢体受压'
          ]
        },
        monitoringIndicators: [
          '每日观察：肢体肿胀、疼痛',
          '注意症状：肢体颜色、温度变化',
          '定期检查：血管超声',
          '监测指标：凝血酶原时间'
        ]
      });
    }
    
    return guidance;
  };

  const getSupportServices = () => {
    const services: Array<{
      title: string;
      emergencyContacts?: string[];
      hospitalInfo?: string[];
      nursingServices?: string[];
      nursingServiceDetails?: Array<{
        provider: string;
        contact: string;
        price: string;
        features: string;
      }>;
      symptomRecords?: Array<{
        date: string;
        symptom: string;
        severity: string;
        description: string;
      }>;
      medicalInfoCard?: {
        fields: string[];
      };
    }> = [];
    
    // 基础服务信息
    services.push({
      title: '辅助服务',
      emergencyContacts: [
        '120急救：120',
        `主治医生：${medicalInfo.mainDiagnosis ? '专科医生' : '未填写'}`,
        `紧急联系人：${emergencyContacts.length > 0 ? emergencyContacts[0].name + ' ' + emergencyContacts[0].phone : '未填写'}`
      ],
      hospitalInfo: hospitals.map(hospital => `${hospital.name}：${hospital.emergency}（${hospital.address}）`),
      nursingServices: [
        '专业护理机构：提供24小时陪护服务',
        '社区医疗：提供基础医疗支持',
        '康复中心：提供专业康复指导',
        '心理咨询：提供心理支持服务'
      ],
      nursingServiceDetails: nursingServices,
      symptomRecords: symptomRecords,
      medicalInfoCard: {
        fields: [
          `姓名：${medicalInfo.name || '未填写'}`,
          `血型：${medicalInfo.bloodType || '未填写'}`,
          `年龄：${medicalInfo.age || '未填写'}`,
          `主要诊断：${medicalInfo.mainDiagnosis || '未填写'}`,
          `过敏史：${medicalInfo.allergies || '未填写'}`,
          `抗凝治疗：${medicalInfo.isOnAnticoagulation ? '是' : '否'}`,
          `紧急联系人：${emergencyContacts.length > 0 ? emergencyContacts[0].name + ' ' + emergencyContacts[0].phone : '未填写'}`,
          `指定医院：${hospitals.length > 0 ? hospitals[0].name : '未填写'}`
        ]
      }
    });
    
    return services;
  };

  const getMedicalTerminology = () => {
    const terminology: Array<{
      category: string;
      title: string;
      items: Array<{
        term: string;
        definition: string;
        significance: string;
      }>;
    }> = [];
    
    if (selectedComplications.includes('obstruction')) {
      terminology.push({
        category: '生命体征相关',
        title: '肠梗阻生命体征',
        items: [
          {
            term: '肠鸣音',
            definition: '肠道蠕动时产生的声音，通过听诊器听取',
            significance: '消失：提示肠麻痹；亢进：提示机械性梗阻'
          },
          {
            term: '腹膜刺激征',
            definition: '腹部压痛、反跳痛、肌紧张三联征',
            significance: '阳性：提示肠坏死或穿孔，需紧急手术'
          }
        ]
      });
      
      terminology.push({
        category: '影像学相关',
        title: '肠梗阻影像学表现',
        items: [
          {
            term: '液气平面',
            definition: '立位腹部X线片中肠管内可见液面和气体分层',
            significance: '典型肠梗阻征象，多个液平提示完全性梗阻'
          },
          {
            term: '移行带征象',
            definition: 'CT扫描中扩张肠管向正常肠管的移行区域',
            significance: '可确定梗阻部位和原因，是诊断的金标准'
          }
        ]
      });
      
      terminology.push({
        category: '临床分型',
        title: '肠梗阻分类',
        items: [
          {
            term: '机械性肠梗阻',
            definition: '肠腔被机械性因素阻塞',
            significance: '常见原因：粘连、肿瘤、疝气、肠扭转'
          },
          {
            term: '麻痹性肠梗阻',
            definition: '肠管失去蠕动功能',
            significance: '常见原因：手术后、电解质紊乱、感染'
          }
        ]
      });
    }
    
    if (selectedComplications.includes('bleeding')) {
      terminology.push({
        category: '生命体征相关',
        title: '消化道出血生命体征',
        items: [
          {
            term: '收缩压(SBP)',
            definition: '心脏收缩时动脉血压最高值',
            significance: '＜90mmHg：休克临界值，提示失血＞20%'
          },
          {
            term: 'GCS评分',
            definition: '格拉斯哥昏迷指数（3-15分）',
            significance: '≤13分：意识障碍，需防误吸'
          }
        ]
      });
      
      terminology.push({
        category: '出血特征',
        title: '消化道出血特征',
        items: [
          {
            term: '咖啡渣样呕血',
            definition: '深褐色颗粒状呕吐物',
            significance: '提示血液在胃内停留＞4小时，相对低危'
          },
          {
            term: '鲜红色呕血',
            definition: '未经胃酸作用的鲜红血液',
            significance: '高危！提示动脉活动性出血'
          }
        ]
      });
      
      terminology.push({
        category: '风险分层工具',
        title: '消化道出血风险评估',
        items: [
          {
            term: 'Rockall评分',
            definition: '上消化道出血死亡风险预测',
            significance: '≥5分：死亡率＞30%'
          },
          {
            term: 'Child-Pugh分级',
            definition: '肝硬化严重程度评估',
            significance: 'C级：1年生存率＜45%'
          }
        ]
      });
    }
    
    if (selectedComplications.includes('biliary')) {
      terminology.push({
        category: '肝功能相关',
        title: '胆道梗阻肝功能指标',
        items: [
          {
            term: '总胆红素(TBIL)',
            definition: '血液中所有胆红素的总和',
            significance: '＞34μmol/L：提示黄疸；＞171μmol/L：重度黄疸'
          },
          {
            term: '直接胆红素(DBIL)',
            definition: '结合胆红素，经过肝脏处理的胆红素',
            significance: '＞6.8μmol/L：提示梗阻性黄疸'
          },
          {
            term: '碱性磷酸酶(ALP)',
            definition: '肝细胞和胆管细胞分泌的酶',
            significance: '＞150U/L：提示胆汁淤积或肝损伤'
          },
          {
            term: 'γ-谷氨酰转移酶(GGT)',
            definition: '主要存在于肝细胞和胆管上皮的酶',
            significance: '＞60U/L：提示胆道梗阻或肝损伤'
          }
        ]
      });
      
      terminology.push({
        category: '临床症状',
        title: '胆道梗阻临床表现',
        items: [
          {
            term: 'Charcot三联征',
            definition: '腹痛、寒战高热、黄疸三联症状',
            significance: '典型急性胆管炎表现，需紧急处理'
          },
          {
            term: 'Reynolds五联征',
            definition: 'Charcot三联征+休克+精神症状',
            significance: '急性梗阻性化脓性胆管炎(AOSC)，死亡率极高'
          },
          {
            term: 'Murphy征阳性',
            definition: '右上腹压痛，深吸气时疼痛加剧',
            significance: '提示急性胆囊炎，常伴随胆道梗阻'
          },
          {
            term: 'Courvoisier征',
            definition: '无痛性胆囊肿大',
            significance: '提示胰头癌或壶腹周围癌导致的慢性梗阻'
          }
        ]
      });
      
      terminology.push({
        category: '影像学检查',
        title: '胆道梗阻影像诊断',
        items: [
          {
            term: '胆管扩张',
            definition: '肝内或肝外胆管直径增宽',
            significance: '肝外胆管＞8mm：提示胆道梗阻'
          },
          {
            term: '双管征',
            definition: 'CT或MRI显示同时扩张的胆管和胰管',
            significance: '提示壶腹水平梗阻，多为胰头癌'
          },
          {
            term: '靶征',
            definition: '增强CT中胆管壁环形强化',
            significance: '提示胆管炎或胆管癌'
          },
          {
            term: 'ERCP',
            definition: '内镜逆行胰胆管造影',
            significance: '胆道梗阻诊断和治疗金标准'
          }
        ]
      });
    }
    
    if (selectedComplications.includes('infection')) {
      terminology.push({
        category: '炎症指标',
        title: '感染相关实验室指标',
        items: [
          {
            term: '白细胞计数(WBC)',
            definition: '血液中白细胞数量',
            significance: '＞10×10⁹/L：提示细菌感染；＜4×10⁹/L：提示病毒感染或免疫抑制'
          },
          {
            term: '中性粒细胞百分比(NEUT%)',
            definition: '中性粒细胞占白细胞的比例',
            significance: '＞75%：提示细菌感染；核左移：严重感染'
          },
          {
            term: 'C反应蛋白(CRP)',
            definition: '肝脏合成的急性期反应蛋白',
            significance: '＞10mg/L：提示炎症；＞100mg/L：严重感染'
          },
          {
            term: '降钙素原(PCT)',
            definition: '甲状腺C细胞分泌的前体物质',
            significance: '＞0.5ng/mL：提示细菌感染；＞2ng/mL：脓毒症'
          },
          {
            term: '血沉(ESR)',
            definition: '红细胞沉降速率',
            significance: '＞20mm/h：提示慢性炎症或感染'
          }
        ]
      });
      
      terminology.push({
        category: '临床体征',
        title: '感染相关临床表现',
        items: [
          {
            term: '弛张热',
            definition: '体温波动＞2℃，但未恢复正常',
            significance: '常见于败血症、脓肿等严重感染'
          },
          {
            term: '稽留热',
            definition: '持续高热，24小时内波动＜1℃',
            significance: '常见于大叶性肺炎、伤寒等'
          },
          {
            term: '脓毒症',
            definition: '感染引起的全身炎症反应综合征',
            significance: 'qSOFA评分≥2：提示预后不良'
          },
          {
            term: '感染性休克',
            definition: '脓毒症合并持续性低血压',
            significance: '需要液体复苏和血管活性药物支持'
          }
        ]
      });
      
      terminology.push({
        category: '病原学检查',
        title: '感染病原学诊断',
        items: [
          {
            term: '血培养',
            definition: '血液中病原微生物的培养',
            significance: '阳性：确诊血流感染金标准'
          },
          {
            term: '革兰染色',
            definition: '细菌染色分类方法',
            significance: '快速区分革兰阳性菌和阴性菌，指导抗生素使用'
          },
          {
            term: '药敏试验',
            definition: '检测细菌对抗生素的敏感性',
            significance: '指导精准抗生素治疗，避免耐药'
          },
          {
            term: 'PCR检测',
            definition: '聚合酶链反应检测病原体核酸',
            significance: '快速、敏感，适用于疑难感染诊断'
          }
        ]
      });
    }
    
    if (selectedComplications.includes('ascites')) {
      terminology.push({
        category: '腹水性质',
        title: '腹水实验室检查',
        items: [
          {
            term: '血清-腹水白蛋白梯度(SAAG)',
            definition: '血清白蛋白减去腹水白蛋白的差值',
            significance: '≥11g/L：提示门脉高压相关腹水；＜11g/L：提示炎症或肿瘤'
          },
          {
            term: '腹水总蛋白',
            definition: '腹水中蛋白质的总量',
            significance: '＞25g/L：渗出液；＜25g/L：漏出液'
          },
          {
            term: '腹水白细胞计数',
            definition: '腹水中白细胞数量',
            significance: '＞500×10⁶/L：提示自发性细菌性腹膜炎(SBP)'
          },
          {
            term: '腹水乳酸脱氢酶(LDH)',
            definition: '腹水中LDH酶活性',
            significance: '＞血清LDH上限的2/3：提示恶性腹水'
          },
          {
            term: '腹水葡萄糖',
            definition: '腹水中葡萄糖含量',
            significance: '＜3.4mmol/L：提示感染或恶性肿瘤'
          }
        ]
      });
      
      terminology.push({
        category: '临床表现',
        title: '腹水症状体征',
        items: [
          {
            term: '移动性浊音',
            definition: '改变体位时腹部浊音区移动的现象',
            significance: '腹水量＞1000ml时的典型体征'
          },
          {
            term: '液波震颤',
            definition: '叩击一侧腹部，对侧可触及波动感',
            significance: '大量腹水(＞3000ml)时的特有体征'
          },
          {
            term: '蛙腹',
            definition: '腹部膨隆如蛙腹状，腹壁静脉显露',
            significance: '大量腹水的典型表现，多见于肝硬化'
          },
          {
            term: '脐疝',
            definition: '腹腔内容物通过脐环突出',
            significance: '腹水导致的腹内压增高所致'
          }
        ]
      });
      
      terminology.push({
        category: '并发症',
        title: '腹水相关并发症',
        items: [
          {
            term: '自发性细菌性腹膜炎(SBP)',
            definition: '无明确感染源的腹水感染',
            significance: '腹水PMN＞250×10⁶/L：需立即抗生素治疗'
          },
          {
            term: '肝肾综合征(HRS)',
            definition: '严重肝病伴功能性肾衰竭',
            significance: '肌酐＞133μmol/L：预后极差，需肝移植'
          },
          {
            term: '肝性脑病',
            definition: '肝功能衰竭引起的中枢神经系统功能障碍',
            significance: '血氨＞80μmol/L：提示肝性脑病'
          },
          {
            term: '腹腔间隔室综合征(ACS)',
            definition: '腹内压持续增高导致器官功能障碍',
            significance: '腹内压＞20mmHg：需紧急减压处理'
          }
        ]
      });
    }
    
    if (selectedComplications.includes('thrombosis')) {
      terminology.push({
        category: '凝血功能',
        title: '血栓相关凝血指标',
        items: [
          {
            term: 'D-二聚体',
            definition: '纤维蛋白降解产物',
            significance: '＞0.5mg/L：提示血栓形成或溶解'
          },
          {
            term: '纤维蛋白原(FIB)',
            definition: '肝脏合成的凝血因子I',
            significance: '＞4g/L：高凝状态；＜2g/L：出血风险'
          },
          {
            term: '凝血酶原时间(PT)',
            definition: '外源性凝血途径筛选试验',
            significance: '延长＞3秒：提示凝血因子缺乏或抗凝治疗'
          },
          {
            term: '活化部分凝血活酶时间(APTT)',
            definition: '内源性凝血途径筛选试验',
            significance: '延长＞10秒：提示凝血因子缺乏或肝素化'
          },
          {
            term: '国际标准化比值(INR)',
            definition: '标准化的凝血酶原时间',
            significance: '＞2.0：抗凝治疗目标；＞3.0：出血风险增加'
          }
        ]
      });
      
      terminology.push({
        category: '血栓类型',
        title: '血栓分类与特点',
        items: [
          {
            term: '深静脉血栓(DVT)',
            definition: '深静脉系统内血栓形成',
            significance: '好发于下肢，肺栓塞风险高'
          },
          {
            term: '肺栓塞(PE)',
            definition: '血栓脱落堵塞肺动脉',
            significance: '大面积PE：死亡率高达30%'
          },
          {
            term: '动脉血栓',
            definition: '动脉系统内血栓形成',
            significance: '导致器官缺血坏死，如心梗、脑梗'
          },
          {
            term: '弥散性血管内凝血(DIC)',
            definition: '全身性血栓形成伴出血倾向',
            significance: '血小板＜50×10⁹/L：预后极差'
          }
        ]
      });
      
      terminology.push({
        category: '诊断检查',
        title: '血栓影像学诊断',
        items: [
          {
            term: '血管超声',
            definition: '超声波检查血管内血流情况',
            significance: 'DVT诊断首选，敏感性95%'
          },
          {
            term: 'CT血管造影(CTA)',
            definition: 'CT增强扫描显示血管情况',
            significance: '肺栓塞诊断金标准'
          },
          {
            term: '磁共振血管成像(MRA)',
            definition: '磁共振显示血管结构',
            significance: '无辐射，适用于肾功能不全患者'
          },
          {
            term: '血管造影',
            definition: '直接注入造影剂显示血管',
            significance: '有创检查，但准确性最高'
          }
        ]
      });
      
      terminology.push({
        category: '治疗相关',
        title: '抗凝治疗监测',
        items: [
          {
            term: '华法林',
            definition: '维生素K拮抗剂类口服抗凝药',
            significance: 'INR目标2.0-3.0，需定期监测'
          },
          {
            term: '低分子肝素',
            definition: '由普通肝素解聚而成的肝素片段',
            significance: '出血风险低，一般无需监测'
          },
          {
            term: '直接口服抗凝药(DOACs)',
            definition: '直接抑制凝血因子的新型口服抗凝药',
            significance: '包括利伐沙班、阿哌沙班等，使用方便'
          },
          {
            term: '溶栓治疗',
            definition: '使用药物溶解已形成的血栓',
            significance: '时间窗内使用，出血风险高'
          }
        ]
      });
    }
    
    return terminology;
  };

  // 状态管理近期用药史
  const [recentMedications, setRecentMedications] = useState([
    { name: '布洛芬', taken: false },
    { name: '阿司匹林', taken: false },
    { name: '利伐沙班', taken: false },
    { name: '华法林', taken: false },
    { name: '非甾体抗炎药', taken: false },
    { name: '糖皮质激素', taken: false },
  ]);
  
  const [customMedication, setCustomMedication] = useState('');
  
  const handleMedicationToggle = (index: number) => {
    const newMedications = [...recentMedications];
    newMedications[index].taken = !newMedications[index].taken;
    setRecentMedications(newMedications);
  };
  
  const handleAddCustomMedication = () => {
    if (customMedication.trim()) {
      setRecentMedications([
        ...recentMedications,
        { name: customMedication.trim(), taken: false }
      ]);
      setCustomMedication('');
    }
  };
  
  const handleRemoveCustomMedication = (index: number) => {
    const newMedications = [...recentMedications];
    newMedications.splice(index, 1);
    setRecentMedications(newMedications);
  };

  const emergencyGuidance = getEmergencyGuidance();
  const diagnosisGuidance = getDiagnosisGuidance();
  const dailyCareGuidance = getDailyCareGuidance();
  const supportServices = getSupportServices();
  const medicalTerminology = getMedicalTerminology();

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex justify-center gap-4"
      >
        <Button
          onClick={handleDownload}
          disabled={isGenerating}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600"
        >
          {isGenerating ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Clock className="h-4 w-4" />
            </motion.div>
          ) : (
            <Download className="h-4 w-4" />
          )}
          {isGenerating ? '生成中...' : '下载卡片'}
        </Button>
        <Button
          onClick={handleShare}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Share2 className="h-4 w-4" />
          分享
        </Button>
      </motion.div>

      {/* Card Preview */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        ref={cardRef}
        className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden"
      >
        {/* Card Header */}
        <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-6 border-2 border-red-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-full p-2">
                <Heart className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">小红卡</h1>
                <p className="text-red-100">并发症管理指引</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-red-100">生成时间</div>
              <div className="text-sm font-medium">
                {new Date().toLocaleDateString('zh-CN')}
              </div>
            </div>
          </div>
        </div>

        {/* Patient Info */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <User className="h-5 w-5 text-red-500" />
            <h2 className="text-lg font-semibold">患者信息</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">姓名</div>
              <div className="font-medium">{medicalInfo.name || '未填写'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">年龄</div>
              <div className="font-medium">{medicalInfo.age || '未填写'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">血型</div>
              <div className="font-medium">{medicalInfo.bloodType || '未填写'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">主要诊断</div>
              <div className="font-medium">{medicalInfo.mainDiagnosis || '未填写'}</div>
            </div>
          </div>
          {medicalInfo.isOnAnticoagulation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 p-3 bg-red-50 dark:bg-red-950 rounded-lg"
            >
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <span className="font-medium text-red-700 dark:text-red-300">抗凝治疗信息</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">药物种类：</span>
                  <span className="font-medium">{medicalInfo.medicationType}</span>
                </div>
                <div>
                  <span className="text-gray-500">最后服用：</span>
                  <span className="font-medium">{medicalInfo.lastTaken}</span>
                </div>
                <div>
                  <span className="text-gray-500">停药原因：</span>
                  <span className="font-medium">{medicalInfo.stopReason}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Emergency Guidance */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-red-100 rounded-full p-1">
              <Shield className="h-5 w-5 text-red-500" />
            </div>
            <h2 className="text-lg font-semibold">🆘 急救指导步骤</h2>
          </div>
          <div className="space-y-4">
            {emergencyGuidance.map((guide, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-red-50 dark:bg-red-950 rounded-lg p-4 border-l-4 border-red-500"
              >
                <h3 className="font-semibold text-red-700 dark:text-red-300 mb-3">
                  {guide.title}
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">处理步骤：</h4>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      {guide.steps.map((step, stepIndex) => (
                        <li key={stepIndex}>{step}</li>
                      ))}
                    </ol>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">注意事项：</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-red-600 dark:text-red-400">
                      {guide.warnings.map((warning, warningIndex) => (
                        <li key={warningIndex}>{warning}</li>
                      ))}
                    </ul>
                  </div>
                  {guide.emergencyCall && (
                    <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-3">
                      <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2">📞 120急救话术模板</h4>
                      <p className="text-sm text-blue-600 dark:text-blue-400 whitespace-pre-line">
                        {guide.emergencyCall.replace(/\[姓名\]/g, medicalInfo.name || '未填写')
                          .replace(/\[年龄\]/g, medicalInfo.age || '未填写')
                          .replace(/\[血型\]/g, medicalInfo.bloodType || '未填写')
                          .replace(/\[主要疾病\]/g, medicalInfo.mainDiagnosis || '未填写')
                          .replace(/\[过敏史\]/g, medicalInfo.allergies || '未填写')
                          .replace(/\[既往病史\]/g, medicalInfo.surgeryHistory || '未填写')}
                      </p>
                    </div>
                  )}
                  {guide.criticalInfo && (
                    <div className="bg-yellow-50 dark:bg-yellow-950 rounded-lg p-3">
                      <h4 className="font-medium text-yellow-700 dark:text-yellow-300 mb-2">🔴 关键信息卡</h4>
                      <div className="text-sm text-yellow-600 dark:text-yellow-400 space-y-1">
                        {guide.criticalInfo.map((info, index) => (
                          <p key={index}>
                            {info.replace(/\[姓名\]/g, medicalInfo.name || '未填写')
                              .replace(/\[年龄\]/g, medicalInfo.age || '未填写')
                              .replace(/\[血型\]/g, medicalInfo.bloodType || '未填写')
                              .replace(/\[主要疾病\]/g, medicalInfo.mainDiagnosis || '未填写')
                              .replace(/\[过敏史\]/g, medicalInfo.allergies || '未填写')
                              .replace(/\[相关风险因素\]/g, medicalInfo.otherDiseases || '未填写')
                              .replace(/\[是\/否\]/g, medicalInfo.isOnAnticoagulation ? '是' : '否')}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Diagnosis Guidance */}
        {diagnosisGuidance.length > 0 && (
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-100 rounded-full p-1">
                <FileText className="h-5 w-5 text-blue-500" />
              </div>
              <h2 className="text-lg font-semibold">🔍 病情诊断关键指引</h2>
            </div>
            <div className="space-y-4">
              {diagnosisGuidance.map((guide, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-blue-50 dark:bg-blue-950 rounded-lg p-4 border-l-4 border-blue-500"
                >
                  <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">
                    {guide.title}
                  </h3>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    {guide.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  {guide.riskFactors && (
                    <div className="mt-4 bg-red-50 dark:bg-red-950 rounded-lg p-3">
                      <h4 className="font-medium text-red-700 dark:text-red-300 mb-2">⚠️ 风险评估体系</h4>
                      <div className="text-sm text-red-600 dark:text-red-400 whitespace-pre-line">
                        {guide.riskFactors.join('\n')}
                      </div>
                    </div>
                  )}
                  {guide.monitoringTable && (
                    <div className="mt-4 bg-green-50 dark:bg-green-950 rounded-lg p-3">
                      <h4 className="font-medium text-green-700 dark:text-green-300 mb-2">{guide.monitoringTable.title}</h4>
                      <div className="text-sm text-green-600 dark:text-green-400 whitespace-pre-line">
                        {guide.monitoringTable.fields.join('\n')}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Daily Care and Prevention */}
        {dailyCareGuidance.length > 0 && (
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-green-100 rounded-full p-1">
                <Activity className="h-5 w-5 text-green-500" />
              </div>
              <h2 className="text-lg font-semibold">🏠 日常注意和预防</h2>
            </div>
            <div className="space-y-6">
              {dailyCareGuidance.map((guide, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-green-50 dark:bg-green-950 rounded-lg p-4 border-l-4 border-green-500"
                >
                  <h3 className="font-semibold text-green-700 dark:text-green-300 mb-4">
                    {guide.title}
                  </h3>
                  
                  {/* Diet Management */}
                  {guide.dietManagement && (
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">🍎 饮食管理</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-green-100 dark:bg-green-900 rounded-lg p-3">
                          <h5 className="font-medium text-green-700 dark:text-green-300 mb-2">推荐食物</h5>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            {guide.dietManagement.recommended.map((item, itemIndex) => (
                              <li key={itemIndex}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-red-100 dark:bg-red-900 rounded-lg p-3">
                          <h5 className="font-medium text-red-700 dark:text-red-300 mb-2">避免食物</h5>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            {guide.dietManagement.avoided.map((item, itemIndex) => (
                              <li key={itemIndex}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Medication Safety */}
                  {guide.medicationSafety && (
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">💊 用药安全指导</h4>
                      <div className="bg-yellow-50 dark:bg-yellow-950 rounded-lg p-3">
                        <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                          {guide.medicationSafety.map((item, itemIndex) => (
                            <li key={itemIndex}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {/* Activity Guidance */}
                  {guide.activityGuidance && (
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">🏃‍♂️ 运动和生活方式</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-3">
                          <h5 className="font-medium text-blue-700 dark:text-blue-300 mb-2">适宜活动</h5>
                          <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
                            {guide.activityGuidance.recommended.map((item, itemIndex) => (
                              <li key={itemIndex}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-orange-50 dark:bg-orange-950 rounded-lg p-3">
                          <h5 className="font-medium text-orange-700 dark:text-orange-300 mb-2">避免活动</h5>
                          <ul className="text-sm text-orange-600 dark:text-orange-400 space-y-1">
                            {guide.activityGuidance.avoided.map((item, itemIndex) => (
                              <li key={itemIndex}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Monitoring Indicators */}
                  {guide.monitoringIndicators && (
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">📊 定期监测指标</h4>
                      <div className="bg-purple-50 dark:bg-purple-950 rounded-lg p-3">
                        <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                          {guide.monitoringIndicators.map((item, itemIndex) => (
                            <li key={itemIndex}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {/* Special Notes */}
                  {guide.specialNotes && (
                    <div>
                      <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">⚠️ 特别提醒</h4>
                      <div className="bg-red-50 dark:bg-red-950 rounded-lg p-3">
                        <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                          {guide.specialNotes.map((item, itemIndex) => (
                            <li key={itemIndex}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {/* Complication-specific notes */}
                  {selectedComplications.includes('obstruction') && (
                    <div className="mt-4 bg-orange-50 dark:bg-orange-950 rounded-lg p-4">
                      <h4 className="font-medium text-orange-700 dark:text-orange-300 mb-2">⚠️ 肠梗阻患者特别注意</h4>
                      <p className="text-sm text-orange-600 dark:text-orange-400">
                        肠梗阻会多次出现，第一次处理大致一样，因此选择三甲医院，但是后续情况会越来越难，尤其是小肠梗阻等情况，导管也不太好处理。
                        复发性肠梗阻手术难度逐次增加，需要经验丰富的医生，可能需要肠切除重建，技术要求高。
                      </p>
                    </div>
                  )}
                  
                  {/* Complication-specific notes */}
                  {selectedComplications.includes('bleeding') && (
                    <div className="mt-4 bg-red-50 dark:bg-red-950 rounded-lg p-4">
                      <h4 className="font-medium text-red-700 dark:text-red-300 mb-2">⚠️ 消化道出血患者特别注意</h4>
                      <p className="text-sm text-red-600 dark:text-red-400">
                        曲张静脉表面仅覆盖0.1-0.3mm薄层黏膜（正常1-2mm），任何机械刺激施加&gt;20mmHg压力即可引发致命性出血，
                        临床数据显示30%急性上消化道出血与摄入坚果相关。
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

      {/* Support Services */}
      {supportServices.length > 0 && (
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-purple-100 rounded-full p-1">
                <Shield className="h-5 w-5 text-purple-500" />
              </div>
              <h2 className="text-lg font-semibold">🤝 辅助服务</h2>
            </div>
            <div className="space-y-6">
              {supportServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-purple-50 dark:bg-purple-950 rounded-lg p-4 border-l-4 border-purple-500"
                >
                  {/* Emergency Contacts */}
                  {service.emergencyContacts && (
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">📞 紧急联系网络</h4>
                      <div className="bg-red-50 dark:bg-red-950 rounded-lg p-3">
                        <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                          {service.emergencyContacts.map((contact, contactIndex) => (
                            <li key={contactIndex}>• {contact}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {/* Hospital Info */}
                  {service.hospitalInfo && service.hospitalInfo.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">🏥 医院信息</h4>
                      <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-3">
                        <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                          {service.hospitalInfo.map((info, infoIndex) => (
                            <li key={infoIndex}>• {info}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {/* Nursing Services */}
                  {service.nursingServices && (
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">👩‍⚕️ 护理服务</h4>
                      <div className="bg-green-50 dark:bg-green-950 rounded-lg p-3">
                        <ul className="text-sm text-green-700 dark:text-green-300 space-y-1 mb-3">
                          {service.nursingServices.map((nursing, nursingIndex) => (
                            <li key={nursingIndex}>• {nursing}</li>
                          ))}
                        </ul>
                        
                        {/* Detailed Nursing Services */}
                        {service.nursingServiceDetails && service.nursingServiceDetails.length > 0 && (
                          <div className="border-t border-green-200 dark:border-green-800 pt-3">
                            <h5 className="font-medium text-green-700 dark:text-green-300 mb-2">已添加的护理服务：</h5>
                            <div className="space-y-2">
                              {service.nursingServiceDetails.map((detail, index) => (
                                <div key={index} className="bg-white dark:bg-green-900 rounded p-2 text-xs">
                                  <div className="font-medium">{detail.provider}</div>
                                  <div className="text-green-600 dark:text-green-400">联系方式：{detail.contact}</div>
                                  <div className="text-green-600 dark:text-green-400">价格：{detail.price}</div>
                                  {detail.features && (
                                    <div className="text-green-600 dark:text-green-400">特色：{detail.features}</div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Symptom Records */}
                  {service.symptomRecords && service.symptomRecords.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">📊 症状记录</h4>
                      <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-3">
                        <div className="space-y-2">
                          {service.symptomRecords.map((record, index) => (
                            <div key={index} className="bg-white dark:bg-blue-900 rounded p-2 text-xs">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="font-medium">{record.symptom}</div>
                                  <div className="text-blue-600 dark:text-blue-400">日期：{record.date}</div>
                                  <div className="text-blue-600 dark:text-blue-400">严重程度：{record.severity}</div>
                                  {record.description && (
                                    <div className="text-blue-600 dark:text-blue-400 mt-1">描述：{record.description}</div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Medical Info Card */}
                  {service.medicalInfoCard && (
                    <div>
                      <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">🆔 个人医疗信息卡</h4>
                      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
                        <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                          {service.medicalInfoCard.fields.map((field, fieldIndex) => (
                            <p key={fieldIndex}>{field}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Personal Medical Information Card */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-purple-100 rounded-full p-1">
              <FileText className="h-5 w-5 text-purple-500" />
            </div>
            <h2 className="text-lg font-semibold">📋 个人医疗信息卡</h2>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            {/* Basic Info */}
            <div className="mb-4">
              <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">基本信息</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div>
                  <span className="text-gray-500">姓名：</span>
                  <span className="font-medium">{medicalInfo.name || '未填写'}</span>
                </div>
                <div>
                  <span className="text-gray-500">血型：</span>
                  <span className="font-medium">{medicalInfo.bloodType || '未填写'}</span>
                </div>
                <div>
                  <span className="text-gray-500">年龄：</span>
                  <span className="font-medium">{medicalInfo.age || '未填写'}</span>
                </div>
                <div>
                  <span className="text-gray-500">联系电话：</span>
                  <span className="font-medium">{emergencyContacts.length > 0 ? emergencyContacts[0].phone : '未填写'}</span>
                </div>
              </div>
            </div>

            {/* Medical History */}
            <div className="mb-4">
              <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">疾病史</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-500">主要诊断：</span>
                  <span className="font-medium">{medicalInfo.mainDiagnosis || '未填写'}</span>
                </div>
                <div>
                  <span className="text-gray-500">既往手术：</span>
                  <span className="font-medium">{medicalInfo.surgeryHistory || '未填写'}</span>
                </div>
                <div>
                  <span className="text-gray-500">药物过敏：</span>
                  <span className="font-medium">{medicalInfo.allergies || '未填写'}</span>
                </div>
                <div>
                  <span className="text-gray-500">其他疾病：</span>
                  <span className="font-medium">{medicalInfo.otherDiseases || '未填写'}</span>
                </div>
              </div>
            </div>

            {/* Anticoagulation History */}
            {medicalInfo.isOnAnticoagulation && (
              <div className="mb-4">
                <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">抗凝治疗史</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-500">是否正在抗凝治疗：</span>
                    <span className="font-medium">是</span>
                  </div>
                  <div>
                    <span className="text-gray-500">抗凝药物种类：</span>
                    <span className="font-medium">{medicalInfo.medicationType}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">最后服用时间：</span>
                    <span className="font-medium">{medicalInfo.lastTaken}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">停药原因：</span>
                    <span className="font-medium">{medicalInfo.stopReason}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Medication History */}
            <div>
              <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">近期用药史（7天内）</h3>
              <div className="space-y-3">
                {/* Predefined medications */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {recentMedications.slice(0, 6).map((med, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={med.taken}
                        onChange={() => handleMedicationToggle(index)}
                        className="rounded border-gray-300 text-red-500 focus:ring-red-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{med.name}</span>
                    </div>
                  ))}
                </div>
                
                {/* Custom medications */}
                {recentMedications.length > 6 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {recentMedications.slice(6).map((med, index) => (
                      <div key={index + 6} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={med.taken}
                          onChange={() => handleMedicationToggle(index + 6)}
                          className="rounded border-gray-300 text-red-500 focus:ring-red-500"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{med.name}</span>
                        <button
                          onClick={() => handleRemoveCustomMedication(index + 6)}
                          className="text-red-500 hover:text-red-700 text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Add custom medication */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customMedication}
                    onChange={(e) => setCustomMedication(e.target.value)}
                    placeholder="添加自定义药物"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <button
                    onClick={handleAddCustomMedication}
                    className="px-3 py-2 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    添加
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Medical Terminology Quick Reference */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-indigo-100 rounded-full p-1">
              <FileText className="h-5 w-5 text-indigo-500" />
            </div>
            <h2 className="text-lg font-semibold">📚 医学术语速查表</h2>
          </div>
          
          <div className="space-y-4">
            {medicalTerminology.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-indigo-50 dark:bg-indigo-950 rounded-lg p-4">
                <h3 className="font-medium text-indigo-700 dark:text-indigo-300 mb-3">{category.title}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-indigo-200 dark:border-indigo-800">
                        <th className="text-left py-2">术语</th>
                        <th className="text-left py-2">定义</th>
                        <th className="text-left py-2">临床意义</th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.items.map((item, itemIndex) => (
                        <tr key={itemIndex} className="border-b border-indigo-100 dark:border-indigo-900">
                          <td className="py-2 font-medium">{item.term}</td>
                          <td className="py-2">{item.definition}</td>
                          <td className="py-2 text-indigo-600 dark:text-indigo-400">{item.significance}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
            
            {medicalTerminology.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <p>请选择并发症类型以显示相关的医学术语速查表</p>
              </div>
            )}
          </div>
        </div>

        {/* Card Footer */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2024 小红卡 - 为您的健康保驾护航，由小红卡开源社区 x 小x宝社区联合提供公益服务
          </p>
        </div>
      </motion.div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="bg-blue-50 dark:bg-blue-950 rounded-lg p-4"
      >
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="h-5 w-5 text-blue-500" />
          <span className="font-medium text-blue-700 dark:text-blue-300">使用提示</span>
        </div>
        <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
          <li>• 请将此卡片保存在手机中，以便紧急情况下快速查看</li>
          <li>• 建议打印一份纸质卡片放在钱包或包中</li>
          <li>• 定期更新个人信息和联系方式</li>
          <li>• 如有任何疑问，请及时咨询专业医生</li>
        </ul>
      </motion.div>
    </div>
  );
}