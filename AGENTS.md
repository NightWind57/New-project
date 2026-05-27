# Project Rules

## Site Boundaries

This repository contains two independent Vite frontend sites.

- Buyer show copy generator: repository root (`index.html`, `src/main.js`, `src/style.css`).
- Operation dashboard: `operation-dashboard/`.

Do not replace one site with the other. Changes for one site must stay inside that site's files unless the user explicitly asks for shared deployment or documentation updates.

## Buyer Show Copy Generator

The buyer show site is the mature production site at:

```text
https://nightwind57.github.io/New-project/
```

Required localStorage keys:

- `buyerShowMaterials`
- `sellingPointOptions`
- `useSceneOptions`
- `generationHistory`
- `editFeedbackHistory`

Do not add backend services, login, database, import/export JSON, search, or unrelated dashboard modules to this site unless explicitly requested.

## Operation Dashboard

The operation dashboard lives under:

```text
operation-dashboard/
```

Published path:

```text
https://nightwind57.github.io/New-project/operation-dashboard/
```

Required storage key:

- `operationDashboardData`

It is a pure frontend localStorage tool for product link daily metrics. Do not add a backend, database, login system, QianNiu API integration, or Feishu write step unless explicitly requested.

## QianNiu Daily Data Workflow

- The recurring workflow runs every day at `09:00` Asia/Shanghai.
- When the workflow runs, open `/Applications/Aliworkbench.app` directly. Do not ask the user for confirmation before opening QianNiu for this task.
- Collect data for the previous calendar day. Example: if the workflow runs on `2026-05-27`, collect data for `2026-05-26`.
- Read configured product links from the operation dashboard data, using each link object's `linkId`.
- After collecting data, update only the operation dashboard data and summarize the collected result in the current thread.
- Do not write Feishu Base records or send Feishu group messages unless the user explicitly asks for that again and permissions are confirmed.

## Operation Metrics

Use QianNiu / 生意参谋 / 商品360 for each configured product.

- `交易金额`: from `销售分析` -> `支付金额`. Keep the raw numeric value.
- `加购量`: from `销售分析` -> `商品加购人数`.
- `客单价`: calculate `支付金额 / 支付件数`, then round to the nearest integer.
- `搜索量`: from `流量来源` old version -> `手淘搜索` -> `访客数`.
- `搜索单量`: from `流量来源` old version -> `手淘搜索` -> `支付买家数`.
- `推广单量`: from `流量来源` old version -> `效果广告` -> `支付买家数`.

Important QianNiu navigation rule:

- After entering `流量来源`, click `返回旧版` first.
- In the old version table, read `手淘搜索` and `效果广告`.
- Do not use the new version flow-source rows as the final source for `搜索量`, `搜索单量`, or `推广单量`.

## Deployment

GitHub Pages deployment builds both sites:

- root build -> `/New-project/`
- `operation-dashboard` build -> `/New-project/operation-dashboard/`

Before deployment, run builds for both sites:

```bash
npm run build
cd operation-dashboard
npm run build
```
