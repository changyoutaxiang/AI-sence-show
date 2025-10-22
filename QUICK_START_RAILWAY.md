# Railway 部署快速开始 🚀

## 5分钟快速部署

### 1️⃣ 注册并登录
访问 [railway.app](https://railway.app) → 使用 GitHub 登录

### 2️⃣ 创建项目
1. 点击 **"New Project"**
2. 选择 **"Deploy from GitHub repo"**
3. 选择 `AI-sence-show` 仓库

### 3️⃣ 添加数据库
1. 在项目中点击 **"New"** → **"Database"** → **"Add PostgreSQL"**
2. 等待数据库创建完成

### 4️⃣ 初始化数据库
在本地运行（需要先从 Railway 复制 DATABASE_URL）：
```bash
export DATABASE_URL="postgresql://..."  # 从 Railway 复制
npm run db:push
```

### 5️⃣ 完成！
点击 Railway 提供的 URL 访问你的应用

---

## ⚠️ 重要提示

### 图片上传问题
当前的图片上传使用**本地存储**，在 Railway 上会有以下问题：
- 每次重新部署，上传的图片会丢失
- Railway 的文件系统是临时的

### 解决方案（必须）
**使用 Cloudinary 云存储**（推荐）

#### 步骤：
1. 注册 [Cloudinary](https://cloudinary.com)（免费）
2. 获取凭证（Cloud Name, API Key, API Secret）
3. 在 Railway 添加环境变量：
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`

4. 安装依赖：
```bash
npm install cloudinary multer-storage-cloudinary
```

5. 修改 `server/upload.ts`（我可以帮你实现）

---

## 📋 检查清单

部署前：
- [ ] 代码已推送到 GitHub
- [ ] 运行 `npm run check` 无错误
- [ ] 运行 `npm run build` 成功

部署后：
- [ ] Railway 部署成功
- [ ] 数据库已添加
- [ ] 运行 `db:push` 初始化表
- [ ] （可选）添加 seed 数据
- [ ] 配置 Cloudinary 存储
- [ ] 测试图片上传功能

---

## 🆘 遇到问题？

查看完整文档：`RAILWAY_DEPLOYMENT.md`

常见问题：
- **部署失败**：查看 Railway 构建日志
- **数据库连接失败**：检查 DATABASE_URL 是否自动注入
- **无法访问**：检查端口配置（应该使用 process.env.PORT）
- **图片上传失败**：按上述步骤配置 Cloudinary

---

需要帮助配置 Cloudinary？告诉我，我可以帮你修改代码！
