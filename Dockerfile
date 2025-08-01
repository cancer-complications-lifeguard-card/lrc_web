# ---------- 构建阶段 ----------
FROM node:20-alpine AS builder

WORKDIR /app

# 安装系统依赖
RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm

# 复制依赖文件并安装
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# 复制源代码
COPY . .

# 生成 Prisma 客户端
RUN pnpm db:generate

# 设置构建环境变量
ARG NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder-key
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_TELEMETRY_DISABLED=1

# 构建应用
RUN pnpm run build

# 清理开发依赖，只保留生产依赖
RUN pnpm prune --prod && pnpm store prune

# ---------- 运行阶段 ----------
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 创建用户
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# 复制必要文件
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/prisma ./prisma

# 安装运行时需要的工具
RUN npm install -g pnpm

# 设置权限
RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3000

CMD ["pnpm", "start"]