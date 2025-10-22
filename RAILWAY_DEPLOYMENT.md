# Railway 部署指南

## 📋 目录
1. [准备工作](#准备工作)
2. [部署步骤](#部署步骤)
3. [配置数据库](#配置数据库)
4. [环境变量设置](#环境变量设置)
5. [图片上传配置](#图片上传配置)
6. [常见问题](#常见问题)

---

## 准备工作

### 1. 注册 Railway 账号
- 访问 [railway.app](https://railway.app)
- 使用 GitHub 账号登录（推荐）

### 2. 确保代码已推送到 GitHub
```bash
git add -A
git commit -m "Prepare for Railway deployment"
git push origin main
```

---

## 部署步骤

### 方法一：通过 Railway 网站部署（推荐）

#### Step 1: 创建新项目
1. 登录 Railway 控制台
2. 点击 **"New Project"**
3. 选择 **"Deploy from GitHub repo"**
4. 授权 Railway 访问你的 GitHub 仓库
5. 选择 `AI-sence-show` 仓库

#### Step 2: Railway 会自动检测配置
Railway 会自动识别：
- Node.js 项目
- package.json 中的构建和启动脚本
- 所需的端口配置

#### Step 3: 添加 PostgreSQL 数据库
1. 在项目页面，点击 **"New"** → **"Database"** → **"Add PostgreSQL"**
2. Railway 会自动创建数据库并生成连接字符串
3. 数据库的 `DATABASE_URL` 会自动注入到环境变量中

---

## 配置数据库

### 自动配置（推荐）
添加 PostgreSQL 服务后，Railway 会自动设置 `DATABASE_URL` 环境变量。

### 手动推送数据库 Schema
部署完成后，需要初始化数据库表：

1. 在 Railway 控制台中，进入你的服务
2. 进入 **"Settings"** → **"Service Variables"**
3. 复制 `DATABASE_URL` 的值
4. 在本地运行：

```bash
# 设置数据库 URL（临时）
export DATABASE_URL="你复制的数据库连接字符串"

# 推送 schema
npm run db:push
```

或者，在 Railway 项目中添加一个一次性部署命令：
1. 进入 **"Settings"** → **"Deploy"**
2. 修改 **"Build Command"**: `npm install && npm run build && npm run db:push`

---

## 环境变量设置

### 必需的环境变量

Railway 会自动设置这些：
- ✅ `DATABASE_URL` - PostgreSQL 连接字符串（由 Railway 自动注入）
- ✅ `PORT` - 应用端口（Railway 自动设置）
- ✅ `NODE_ENV` - 建议设置为 `production`

### 可选环境变量

如果需要其他配置，在 **"Variables"** 标签页添加：

```bash
NODE_ENV=production
```

---

## 图片上传配置

### ⚠️ 重要：Railway 文件存储是临时的

Railway 的文件系统是**临时的**（ephemeral），这意味着：
- ❌ 上传的图片在重新部署后会丢失
- ❌ 不适合生产环境的文件存储

### 解决方案：使用云存储服务

推荐使用以下服务之一：

#### 选项 1: Cloudinary（推荐，免费额度大）

1. 注册 [Cloudinary](https://cloudinary.com)
2. 获取 API 凭证
3. 安装 SDK：
   ```bash
   npm install cloudinary multer-storage-cloudinary
   ```

4. 修改 `server/upload.ts`:
   ```typescript
   import { v2 as cloudinary } from 'cloudinary';
   import { CloudinaryStorage } from 'multer-storage-cloudinary';

   cloudinary.config({
     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
     api_key: process.env.CLOUDINARY_API_KEY,
     api_secret: process.env.CLOUDINARY_API_SECRET
   });

   const storage = new CloudinaryStorage({
     cloudinary: cloudinary,
     params: {
       folder: 'ai-scenes',
       allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
     },
   });
   ```

5. 在 Railway 添加环境变量：
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`

#### 选项 2: AWS S3
适合需要更多控制的场景

#### 选项 3: Railway Volumes（持久化存储）
Railway 提供持久化卷，但需要额外配置

---

## 部署后的操作

### 1. 初始化数据库（如果使用 seed 数据）

在本地连接 Railway 数据库：
```bash
# 设置 DATABASE_URL
export DATABASE_URL="railway提供的连接字符串"

# 运行 seed
npx tsx server/seed.ts
```

或创建一个部署钩子自动运行。

### 2. 查看部署日志

在 Railway 控制台：
- 进入 **"Deployments"** 查看构建日志
- 进入 **"Observability"** 查看运行日志

### 3. 访问你的应用

部署成功后，Railway 会提供一个 URL，格式如：
```
https://your-app-name.up.railway.app
```

---

## 常见问题

### Q1: 部署失败，显示 "Build failed"
**解决方法：**
- 检查 Railway 的构建日志
- 确保 `package.json` 中的 `build` 脚本正确
- 检查 TypeScript 编译错误：`npm run check`

### Q2: 应用启动但无法访问
**解决方法：**
- 检查 `server/index.ts` 中的端口配置
- 确保使用 `process.env.PORT` 或默认 5000
- 检查应用是否监听 `0.0.0.0` 而不是 `localhost`

### Q3: 数据库连接失败
**解决方法：**
- 确认 PostgreSQL 服务已添加
- 检查 `DATABASE_URL` 环境变量是否存在
- 查看日志中的具体错误信息

### Q4: 图片上传后消失
**解决方法：**
- 这是正常的，Railway 文件系统是临时的
- 必须使用云存储服务（见上文）

### Q5: 如何查看应用日志？
**解决方法：**
- Railway 控制台 → 选择服务 → "Observability" 标签
- 或使用 Railway CLI：`railway logs`

### Q6: 如何连接到 Railway 数据库？
**解决方法：**
使用 Railway CLI：
```bash
# 安装 Railway CLI
npm i -g @railway/cli

# 登录
railway login

# 链接项目
railway link

# 连接数据库
railway connect postgres
```

---

## 部署脚本优化

### 添加部署前检查

在 `package.json` 中添加：
```json
{
  "scripts": {
    "predeploy": "npm run check",
    "deploy": "npm run build"
  }
}
```

### Railway 配置文件

创建 `railway.json`（可选）：
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm install && npm run build && npm run db:push"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

---

## 性能优化建议

### 1. 启用 Node.js 生产模式
确保设置 `NODE_ENV=production`

### 2. 添加健康检查端点
在 `server/routes.ts` 添加：
```typescript
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});
```

### 3. 数据库连接池
检查 `server/db.ts` 是否配置了合理的连接池大小

---

## 监控和维护

### 使用 Railway 提供的监控
- CPU/内存使用情况
- 请求日志
- 错误追踪

### 设置告警
在 Railway 中可以设置：
- 部署失败告警
- 服务下线告警
- 资源使用告警

---

## 成本估算

Railway 定价（截至 2025）：
- **免费额度**: $5 credit/月
- **Hobby Plan**: $5/月（适合个人项目）
- **Pro Plan**: $20/月起（适合团队）

典型成本：
- Web 服务: ~$5-10/月
- PostgreSQL: ~$5-10/月
- 总计: ~$10-20/月

---

## 下一步

✅ 部署完成后：
1. 测试所有功能
2. 配置云存储（Cloudinary）
3. 添加自定义域名（可选）
4. 设置 CI/CD 自动部署
5. 监控应用性能

需要帮助？参考 [Railway 官方文档](https://docs.railway.app)
