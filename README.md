# 小红卡 - 并发症管理指引生成器

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=white)](https://supabase.com/)

> 🚑 专为癌症、罕见病等多病种患者设计的并发症管理指引生成器，基于小红卡四大模块体系提供专业、全面的医疗支持。

## 🎯 项目简介

小红卡是一个基于 Next.js 15 开发的现代化医疗健康应用，旨在为癌症、罕见病、慢性病患者及其家属提供专业的并发症管理支持。通过结构化的指引生成系统和 AI 智能助手，帮助用户快速获取科学的并发症处理方案。

### ✨ 核心功能

- **🆘 指引生成器**：基于小红卡四大模块的个性化指引生成
- **🤖 AI 智能助手**：使用 z-ai-web-dev-sdk 的专业医疗咨询
- **📊 实时统计**：访问量和服务患者数的实时统计
- **📱 响应式设计**：支持移动端、平板、桌面端全设备访问
- **🔄 实时通信**：WebSocket 支持的在线用户统计和实时更新

## 🚀 快速开始

### 环境要求

- Node.js 18.0 或更高版本
- pnpm 包管理器（推荐）或 npm/yarn
- Supabase 账户（用于数据库和实时功能）

### 安装步骤

1. **克隆项目**
   ```bash
   git clone https://github.com/your-username/xiaohongka.git
   cd xiaohongka
   ```

2. **⚠️ 重要：安装 pnpm（如果尚未安装）**
   ```bash
   # 全局安装 pnpm
   npm install -g pnpm
   
   # 或使用 corepack（Node.js 16.10+）
   corepack enable
   corepack prepare pnpm@latest --activate
   ```

3. **安装依赖**
   ```bash
   # 必须先安装依赖，否则会出现 "next: command not found" 错误
   pnpm install
   ```

4. **环境配置**
   ```bash
   # 复制环境变量模板（如果存在）
   cp .env.example .env.local
   
   # 或者直接创建 .env 文件
   touch .env
   ```

5. **配置 Supabase**
   ```bash
   # 在 .env 文件中添加以下配置
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

6. **构建项目（可选）**
   ```bash
   # 构建生产版本
   pnpm run build
   ```

7. **启动应用**
   
   **开发模式（推荐用于开发）：**
   ```bash
   pnpm run dev
   ```
   
   **生产模式（推荐用于部署）：**
   ```bash
   # 先构建项目
   pnpm run build
   
   # 启动生产服务器
   pnpm start
   ```

8. **访问应用**
   打开浏览器访问 [http://localhost:3000](http://localhost:3000)

### 🔧 常见问题排除

#### 问题 1: "next: command not found"
**原因**：未安装项目依赖  
**解决方案**：
```bash
pnpm install
```

#### 问题 2: "supabaseUrl is required"
**原因**：缺少 Supabase 环境变量配置  
**解决方案**：
1. 确保项目根目录存在 `.env` 文件
2. 检查文件中是否包含正确的 Supabase 配置：
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

#### 问题 3: 构建失败
**解决方案**：
```bash
# 清理缓存并重新安装
rm -rf node_modules pnpm-lock.yaml .next
pnpm install
pnpm run build
```

#### 问题 4: pnpm 命令不存在
**原因**：未安装 pnpm 包管理器  
**解决方案**：
```bash
# 方法 1：使用 npm 安装
npm install -g pnpm

# 方法 2：使用 corepack（推荐）
corepack enable
corepack prepare pnpm@latest --activate

# 方法 3：如果仍使用 npm
npm install  # 作为备选方案
```

### 📋 启动检查清单

在启动项目前，请确认以下步骤已完成：

- [ ] ✅ 已安装 Node.js 18.0+
- [ ] ✅ 已安装 pnpm 包管理器
- [ ] ✅ 已运行 `pnpm install` 安装依赖
- [ ] ✅ 已创建并配置 `.env` 文件
- [ ] ✅ Supabase 环境变量已正确设置
- [ ] ✅ 项目构建成功（运行 `pnpm run build` 无错误）
- [ ] ✅ 可以正常启动开发服务器（`pnpm run dev`）

## 📋 功能特性

### 🆘 指引生成器

基于小红卡四大模块体系的五步式指引生成流程：

1. **并发症选择**：选择需要管理的并发症类型
2. **医疗信息填写**：填写个人基本信息和医疗历史
3. **紧急联系人添加**：添加紧急联系人和医院信息
4. **护理服务配置**：选择合适的护理服务和症状记录管理
5. **卡片预览生成**：预览和下载个性化指引卡片

### 🤖 AI 智能助手

集成了专业的医疗 AI 助手，提供：
- **并发症咨询**：专业的并发症管理建议
- **风险评估**：红绿灯系统的风险分层
- **急救指导**：紧急情况下的处理步骤
- **日常预防**：个性化的预防措施和生活指导

### 📊 实时统计系统

- **累计使用人次**：所有时间的总访问量
- **今日访问量**：当日的访问次数
- **服务患者数**：通过小红卡服务的患者数量
- **在线用户数**：当前在线的用户数量
- **统计日期**：数据统计的日期信息

### 🔄 实时通信

- **WebSocket 支持**：实时用户状态同步
- **在线状态**：显示当前在线用户数量
- **实时更新**：统计数据实时更新

## 🛠 技术栈

### 前端技术
- **框架**：Next.js 15 (App Router)
- **语言**：TypeScript 5
- **样式**：Tailwind CSS 4
- **组件库**：shadcn/ui (New York style)
- **状态管理**：Zustand + TanStack Query
- **动画**：Framer Motion
- **图标**：Lucide React

### 后端技术
- **API**：Next.js API Routes
- **数据库**：Supabase (PostgreSQL)
- **实时通信**：WebSocket / Socket.io
- **AI集成**：z-ai-web-dev-sdk

### 开发工具
- **包管理**：pnpm（推荐）
- **代码质量**：ESLint + Prettier
- **类型检查**：TypeScript
- **构建工具**：Next.js

## 📁 项目结构

```
xiaohongka/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API 路由
│   │   ├── page.tsx           # 首页
│   │   └── layout.tsx         # 根布局
│   ├── components/            # React 组件
│   │   ├── ui/                # shadcn/ui 组件
│   │   ├── GuideGenerator.tsx # 指引生成器
│   │   ├── CardPreview.tsx    # 卡片预览
│   │   ├── VisitCounter.tsx   # 访问计数器
│   │   └── AIAssistant.tsx    # AI 助手
│   ├── lib/                   # 工具库
│   │   ├── supabase.ts        # Supabase 客户端
│   │   ├── socket.ts          # WebSocket 配置
│   │   └── utils.ts           # 工具函数
│   └── types/                 # TypeScript 类型定义
├── prisma/                    # Prisma 配置
├── public/                    # 静态资源
├── docs/                      # 文档
├── .env.local                 # 环境变量
├── package.json               # 项目配置
├── pnpm-lock.yaml             # pnpm 锁文件
├── pnpm-workspace.yaml        # pnpm 工作区配置
├── tailwind.config.js         # Tailwind 配置
├── tsconfig.json              # TypeScript 配置
└── README.md                  # 项目说明
```

## 🔧 配置说明

### 环境变量

```bash
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# 可选配置
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="小红卡"
```

### Supabase 数据库表

```sql
-- 访问统计表
CREATE TABLE visit_counters (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  date TIMESTAMPTZ DEFAULT NOW(),
  visits INTEGER DEFAULT 1,
  patients INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 在线用户表
CREATE TABLE online_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT UNIQUE NOT NULL,
  user_agent TEXT,
  ip_address INET,
  last_activity TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## 🚀 部署指南

### Vercel 部署（推荐）

1. **连接代码仓库**
   ```bash
   # 在 Vercel 中导入项目
   # 选择 GitHub 仓库
   ```

2. **配置环境变量**
   ```bash
   # 在 Vercel 项目设置中添加环境变量
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
   ```

3. **配置构建设置（可选）**
   ```bash
   # 在 Vercel 项目设置中配置构建命令
   # Build Command: pnpm run build
   # Install Command: pnpm install
   ```

4. **自动部署**
   - 推送代码到 GitHub 主分支
   - Vercel 会自动构建和部署

### Cloudflare Pages 部署

⚠️ **重要提醒**：本项目使用了 Next.js API Routes，需要特殊处理才能在 Cloudflare Pages 上部署。

#### 方案一：静态导出部署（推荐用于展示）

1. **准备工作**
   ```bash
   # 确保项目已推送到 GitHub/GitLab
   git push origin main
   ```

2. **使用专用配置文件**
   ```bash
   # 项目已包含 Cloudflare Pages 专用配置
   # 文件：next.config.cloudflare.ts
   
   # 临时替换配置文件进行构建
   cp next.config.cloudflare.ts next.config.ts
   pnpm run build
   ```

3. **创建 Cloudflare Pages 项目**
   - 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - 进入 **Pages** 页面
   - 点击 **创建项目** > **连接到 Git**
   - 选择你的 GitHub/GitLab 仓库

4. **配置构建设置**
   ```bash
   # 项目名称: xiaohongka (或自定义名称)
   # 生产分支: main
   # 构建命令: cp next.config.cloudflare.ts next.config.ts && pnpm run build
   # 构建输出目录: out
   # Root 目录: / (项目根目录)
   ```

5. **配置环境变量**
   在 Cloudflare Pages 项目设置中添加：
   ```bash
   # 生产环境变量
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
   NODE_VERSION=18
   PNPM_VERSION=latest
   ```

6. **部署流程**
   - 推送代码到主分支
   - Cloudflare Pages 自动触发构建
   - 构建完成后自动部署到全球 CDN

#### 方案二：API Routes 迁移（完整功能）

如需保留完整的 API 功能，需要将 API Routes 迁移到 Cloudflare Workers：

1. **创建 Cloudflare Workers 项目**
   ```bash
   # 安装 Wrangler CLI
   npm install -g wrangler
   
   # 创建新的 Workers 项目
   wrangler init xiaohongka-api
   cd xiaohongka-api
   ```

2. **迁移 API Routes**
   ```typescript
   // workers/src/index.ts
   export default {
     async fetch(request: Request): Promise<Response> {
       const url = new URL(request.url);
       
       // 迁移 /api/counter 路由
       if (url.pathname === '/api/counter') {
         // 原 API 逻辑
         return new Response(JSON.stringify({ visits: 100 }), {
           headers: { 'Content-Type': 'application/json' }
         });
       }
       
       // 迁移 /api/ai/chat 路由
       if (url.pathname === '/api/ai/chat') {
         // 原 AI 聊天逻辑
         return new Response(JSON.stringify({ message: 'Hello' }), {
           headers: { 'Content-Type': 'application/json' }
         });
       }
       
       return new Response('Not Found', { status: 404 });
     }
   };
   ```

3. **部署 Workers**
   ```bash
   # 部署到 Cloudflare Workers
   wrangler deploy
   ```

4. **更新前端 API 调用**
   ```typescript
   // 更新 API 基础 URL
   const API_BASE_URL = 'https://xiaohongka-api.your-subdomain.workers.dev';
   
   // 更新 API 调用
   const response = await fetch(`${API_BASE_URL}/api/counter`);
   ```

#### 方案三：使用 Supabase Edge Functions

1. **创建 Edge Functions**
   ```bash
   # 在 Supabase 项目中创建 Edge Functions
   supabase functions new counter
   supabase functions new ai-chat
   ```

2. **迁移 API 逻辑**
   ```typescript
   // supabase/functions/counter/index.ts
   import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
   
   serve(async (req) => {
     // 原 counter API 逻辑
     return new Response(
       JSON.stringify({ visits: 100 }),
       { headers: { "Content-Type": "application/json" } },
     )
   })
   ```

3. **部署 Edge Functions**
   ```bash
   supabase functions deploy counter
   supabase functions deploy ai-chat
   ```

4. **更新前端调用**
   ```typescript
   // 使用 Supabase Edge Functions
   const { data } = await supabase.functions.invoke('counter');
   ```

### Cloudflare Pages 优势

- ✅ **全球 CDN**：超过 200+ 边缘节点
- ✅ **免费 SSL**：自动 HTTPS 证书
- ✅ **无限带宽**：免费计划包含无限带宽
- ✅ **快速构建**：平均构建时间 < 1 分钟
- ✅ **预览部署**：每个 PR 自动生成预览链接
- ✅ **回滚支持**：一键回滚到任意版本

### Cloudflare Pages 注意事项

⚠️ **重要限制**：
- Cloudflare Pages 仅支持静态网站
- 需要配置 `output: 'export'` 进行静态导出
- API Routes 需要迁移到 Cloudflare Workers 或外部服务
- 某些 Next.js 功能（如 ISR、SSR）不支持
- 图片优化功能需要禁用

💡 **推荐选择**：
```bash
# 根据项目需求选择部署方案：

# 1. 仅展示静态内容 → Cloudflare Pages (方案一)
# 2. 需要完整 API 功能 → Vercel 部署
# 3. 高级用户 → Cloudflare Pages + Workers (方案二)
# 4. 已使用 Supabase → Cloudflare Pages + Edge Functions (方案三)
```

### Docker 部署

```bash
# 构建镜像
docker build -t xiaohongka .

# 运行容器
docker run -p 3000:3000 --env-file .env.local xiaohongka
```

### 传统服务器部署

```bash
# 安装 pnpm（如果尚未安装）
npm install -g pnpm

# 安装依赖
pnpm install

# 构建项目
pnpm run build

# 启动生产服务器
pnpm start
```

### 包管理器迁移说明

如果项目之前使用 npm，现在迁移到 pnpm：

```bash
# 1. 删除旧的锁文件
rm package-lock.json

# 2. 安装 pnpm
npm install -g pnpm

# 3. 安装依赖
pnpm install

# 4. 测试构建
pnpm run build

# 5. 提交新的锁文件
git add pnpm-lock.yaml
git commit -m "feat: 迁移到 pnpm 包管理器"
```

## 📊 性能优化

### 前端优化
- **代码分割**：动态导入大型组件
- **图片优化**：使用 WebP 格式和懒加载
- **缓存策略**：浏览器缓存和 CDN 加速
- **字体优化**：预加载关键字体文件

### 后端优化
- **数据库索引**：为常用查询字段创建索引
- **查询优化**：避免 N+1 查询问题
- **连接池**：配置适当的连接池大小
- **CDN 加速**：静态资源通过 CDN 分发

## 🔒 安全考虑

### 数据安全
- **API 密钥管理**：使用环境变量存储敏感信息
- **数据验证**：所有输入数据进行严格验证
- **SQL 注入防护**：使用参数化查询
- **HTTPS 加密**：全站 HTTPS 支持

### 访问控制
- **CORS 配置**：限制跨域访问
- **速率限制**：防止 API 滥用
- **会话管理**：安全的会话标识符生成

### 隐私保护
- **IP 地址处理**：匿名化处理用户 IP
- **用户代理**：不存储敏感的浏览器信息
- **数据最小化**：仅收集必要的统计信息

## 🧪 测试

### 运行测试
```bash
# 运行单元测试
pnpm test

# 运行端到端测试
pnpm run test:e2e

# 代码覆盖率
pnpm run test:coverage
```

### 测试覆盖
- **单元测试**：组件和工具函数测试
- **集成测试**：API 接口和数据库交互测试
- **端到端测试**：完整用户流程测试
- **性能测试**：加载速度和并发处理测试

## 🤝 贡献指南

### 开发流程
1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

### 代码规范
- 使用 TypeScript 严格模式
- 遵循 ESLint 和 Prettier 规则
- 编写清晰的组件和函数文档
- 提交信息使用约定式提交规范

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React 框架
- [Supabase](https://supabase.com/) - 后端即服务
- [shadcn/ui](https://ui.shadcn.com/) - UI 组件库
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Framer Motion](https://www.framer.com/motion/) - 动画库

## 📞 联系我们

- **项目主页**：[https://xiaohongka.example.com](https://xiaohongka.example.com)
- **问题反馈**：[GitHub Issues](https://github.com/your-username/xiaohongka/issues)
- **邮件联系**：[contact@xiaohongka.example.com](mailto:contact@xiaohongka.example.com)

## 📚 相关文档

- [开发日志](supabase_dev_log.md)
- [设计文档](design.md)
- [Supabase 配置](SUPABASE_COUNTER.md)
- [API 文档](docs/api.md)

---

**最后更新**：2025-01-27  
**版本**：v2.3.0  
**维护者**：Z.ai Code Team  
**包管理器**：pnpm（已从 npm 迁移）