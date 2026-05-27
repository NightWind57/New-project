# 充电器买家秀文案素材库

一个纯前端的买家秀文案素材库 + 文案生成器，适合部署到 Vercel。

所有数据都保存在访问者自己浏览器的 `localStorage` 中，不需要账号、数据库或后端接口。不同用户之间的数据不会共享。

## 功能

- 选择卖点、使用场景和创意强度生成 10 条真实买家秀文案
- 添加自定义卖点和自定义使用场景
- 删除任意卖点/场景选项
- 参考素材库生成文案
- 生成结果支持编辑、复制、添加到素材库
- 素材库支持添加、复制、编辑、删除
- 数据保存在本机浏览器 `localStorage`

## 本地运行

```bash
npm install
npm run dev
```

启动后按终端提示打开本地地址，通常是：

```text
http://localhost:5173
```

## 构建

```bash
npm run build
```

构建产物会输出到 `dist/`。

## 本地预览构建结果

```bash
npm run preview
```

## 部署到 Vercel

1. 将项目推送到 GitHub、GitLab 或 Bitbucket。
2. 打开 [Vercel](https://vercel.com) 并导入该仓库。
3. Framework Preset 选择 `Vite`。
4. Build Command 使用：

```bash
npm run build
```

5. Output Directory 使用：

```text
dist
```

6. 点击 Deploy。

部署完成后，访问 Vercel 提供的网址即可使用。网站没有登录系统，也不会把数据上传到服务器；每个访问者的数据只保存在自己的浏览器里。

## 部署到 GitHub Pages

本仓库已包含 GitHub Actions 工作流：`.github/workflows/deploy.yml`。

推送到 `main` 分支后，GitHub 会自动执行构建并发布到 GitHub Pages。首次使用时，在 GitHub 仓库页面打开：

```text
Settings -> Pages
```

将 Source 选择为：

```text
GitHub Actions
```

项目发布地址通常是：

```text
https://nightwind57.github.io/New-project/
```

## localStorage Key

当前工具继续使用这些 key，避免破坏已有浏览器数据：

- `buyerShowMaterials`
- `sellingPointOptions`
- `useSceneOptions`
- `generationHistory`

兼容旧版本数据：

- `buyerShowReferenceTexts` 会迁移为素材库数据
- `customSellingPoints` 会合并进卖点选项
- `customUseScenes` 会合并进使用场景选项

## 注意事项

- 这个项目没有数据库和账号系统，数据不会同步到云端。
- 清理浏览器缓存、清除站点数据、切换浏览器或使用无痕模式，可能导致本地素材库、选项和生成历史丢失。
- 如果需要长期保存重要素材，建议定期手动复制备份。
