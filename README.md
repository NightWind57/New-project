# New project

这个仓库现在包含两个互相独立的 Vite 纯前端网站。

## 目录结构

```text
New project/
  index.html
  package.json
  src/
    main.js
    style.css
  operation-dashboard/
    index.html
    package.json
    src/
      main.js
      style.css
```

## 网站 1：买家秀文案生成器

位置：仓库根目录。

用途：成熟的充电器买家秀文案素材库 + 文案生成器。

核心功能：

- 选择卖点
- 添加自定义卖点
- 删除卖点选项
- 选择使用场景
- 添加自定义使用场景
- 删除使用场景选项
- 创意强度：稳定 / 标准 / 发散
- 开关：参考素材库生成
- 默认生成 10 条真实买家秀文案
- 生成结果支持编辑、复制、添加到素材库
- 素材库支持添加、复制、编辑、删除
- 使用 `localStorage` 保存数据

本地运行：

```bash
npm install
npm run dev
```

本地构建：

```bash
npm run build
```

本地测试 Netlify Function：

```bash
npm install
GEMINI_API_KEY=你的GeminiAPIKey npx netlify dev
```

然后访问 Netlify Dev 提供的本地地址。前端会请求 `/.netlify/functions/generate-copy`，由 Netlify Function 在服务端读取 `GEMINI_API_KEY` 并调用 Gemini API。不要把 API Key 写进 `src/main.js`、`index.html` 或任何前端文件。

如果没有配置 `GEMINI_API_KEY`，或者 Gemini API 调用失败，页面会提示“AI 生成失败，已使用本地生成器兜底”，并自动使用本地规则生成器兜底。

GitHub Pages 地址：

```text
https://nightwind57.github.io/New-project/
```

localStorage key：

- `buyerShowMaterials`
- `sellingPointOptions`
- `useSceneOptions`
- `generationHistory`
- `editFeedbackHistory`

兼容旧版本数据：

- `buyerShowReferenceTexts` 会迁移为素材库数据
- `customSellingPoints` 会合并进卖点选项
- `customUseScenes` 会合并进使用场景选项

## 网站 2：运营数据看板

位置：`operation-dashboard/`

用途：每天录入商品链接运营数据，并查看当前日期、昨日对比和最近 7 天趋势分析。

核心功能：

- 添加、编辑、删除目标链接
- 每个链接包含链接名称和链接 ID
- 每个链接的数据独立保存
- 选择研究日期
- 录入交易金额、搜索量、搜索单量、推广单量、加购量、客单价
- 自动计算销量和搜索转化率
- 当前日期数据复制区支持 1 行 8 列 tab 分隔复制
- 今日运营结论
- 最近 7 天数据表
- 最近 7 天趋势分析
- 使用 `localStorage` 保存数据

本地运行：

```bash
cd operation-dashboard
npm install
npm run dev
```

本地构建：

```bash
cd operation-dashboard
npm run build
```

GitHub Pages 地址：

```text
https://nightwind57.github.io/New-project/operation-dashboard/
```

localStorage key：

- `operationDashboardData`
- `dailyLinkSelectedDates`

说明：`dailyLinkSelectedDates` 只保存运营看板的当前研究日期选择，不保存买家秀数据。

## 部署

本仓库使用 `.github/workflows/deploy.yml` 发布 GitHub Pages。

推送到 `main` 分支后会执行：

1. 构建根目录买家秀文案生成器。
2. 构建 `operation-dashboard/` 运营数据看板。
3. 将买家秀网站发布到 `/New-project/`。
4. 将运营看板发布到 `/New-project/operation-dashboard/`。

两个网站的代码、构建产物和 `localStorage` key 独立，后续修改其中一个网站时不要覆盖另一个网站。

## Netlify 部署买家秀文案生成器

买家秀文案生成器也可以部署到 Netlify，并通过 Netlify Functions 调用 Gemini API。

Netlify 部署步骤：

1. 将仓库推送到 GitHub。
2. 登录 Netlify，选择 Add new site。
3. 选择 Import an existing project，并连接这个 GitHub 仓库。
4. Build command 填写：

```bash
npm run build
```

5. Publish directory 填写：

```text
dist
```

6. Functions directory 使用项目中的：

```text
netlify/functions
```

本项目已提供 `netlify.toml`：

```toml
[build]
command = "npm run build"
publish = "dist"

[functions]
directory = "netlify/functions"
```

配置 Gemini API Key：

1. 在 Netlify 项目后台进入 Site configuration。
2. 打开 Environment variables。
3. 新增变量：

```text
GEMINI_API_KEY=你的Gemini API Key
```

可选变量：

```text
GEMINI_MODEL=gemini-2.5-flash-lite
```

注意事项：

- API Key 只能配置在 Netlify 环境变量里。
- 不要把 API Key 写进前端代码、README 示例真实值或 GitHub 仓库。
- 本地开发测试 Netlify Function 时，可以在本机临时设置 `GEMINI_API_KEY` 环境变量，或使用 Netlify Dev 读取本地环境变量；不要提交 `.env`。
- AI 生成请求会先进入 `/.netlify/functions/generate-copy`，由 Netlify Function 在服务端读取 `GEMINI_API_KEY` 并调用 Gemini API。
- 如果 AI 生成失败、接口返回异常或返回文案不足 10 条，前端会使用本地规则生成器兜底或补足。
- 用户数据仍然保存在每个用户自己浏览器的 `localStorage` 中，不会上传到数据库。
- 素材库内容会作为风格样本发送给 Netlify Function，用于学习说话方式、语气和细节密度；Function 会要求模型不要直接复制素材库原文。
- 编辑反馈也会作为偏好样本发送给 Netlify Function，用于学习用户常删和常加的表达；项目不保存服务端数据库。

## AI 生成质量测试用例

测试 1：

- 卖点：低温
- 场景：办公室用
- 预期：只写低温和办公室，不写床头、家里、颜值、快充。

测试 2：

- 卖点：颜值
- 场景：家里用
- 预期：只写颜值和家里场景，不写办公室、低温、快充。

测试 3：

- 卖点：对比旧充电器
- 场景：刚换手机
- 预期：要体现新手机和旧充电器对比，不写朋友推荐和网络种草。

测试 4：

- 卖点：快充
- 场景：回购
- 预期：要体现之前买过、再次购买、快充体验。

测试 5：

- 同样卖点和场景下分别选择稳定、标准、发散。
- 预期：三种风格的长度、细节、句式明显不同。稳定更短更保守，标准更均衡，发散更有场景细节但仍像真实买家秀。
