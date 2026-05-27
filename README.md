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
