# Project Rules

## QianNiu Daily Data Workflow

- The recurring workflow runs every day at `09:00` Asia/Shanghai.
- When the workflow runs, open `/Applications/Aliworkbench.app` directly. Do not ask the user for confirmation before opening QianNiu for this task.
- Collect data for the previous calendar day. Example: if the workflow runs on `2026-05-27`, collect data for `2026-05-26`.
- Do not write the collected data into Feishu Base unless the user explicitly asks for that again.
- Do not send Feishu group messages for this workflow unless the user explicitly asks for that again and the required permissions are confirmed.
- After collecting the data, update the website's `localStorage` data under key `dailyLinkMetrics`, then summarize the collected result in the current thread.
- The website is a pure frontend Vite app. Do not add a backend, database, login system, QianNiu API integration, or Feishu write step for this workflow unless the user explicitly asks.

## Link Configuration

- Product links are no longer hardcoded as `linkA` / `linkB` / `linkC`.
- Read the configured links from browser `localStorage` key `dailyLinkMetrics`.
- Use each configured link object's `linkId` as the QianNiu / product ID to search.
- Use each configured link object's `name` as the display name in user-facing summaries.
- Match collected data back to the same link by its internal `id` or by `linkId`.
- If a configured link has an empty `linkId`, do not guess. Mark it as skipped and explain that the link ID is missing.

Storage shape:

```json
{
  "links": [
    {
      "id": "internal unique id",
      "name": "链接名称",
      "linkId": "千牛/商品链接ID",
      "records": []
    }
  ],
  "activeLinkId": "current internal id"
}
```

## Data Source And Metrics

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

## Output Format

Reply with a concise table in the current thread after updating the website data:

| 链接名称 | 链接 ID | 交易金额 | 搜索量 | 搜索单量 | 推广单量 | 加购量 | 客单价 |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |

If a product cannot be collected, do not guess. Mark that row as failed and include the concrete reason.

## Website Record Format

Each link stores its own records:

- `date`: `YYYY-MM-DD`
- `transactionAmount`: 交易金额
- `searchVolume`: 搜索量
- `searchOrderCount`: 搜索单量
- `promotionOrderCount`: 推广单量
- `addCartCount`: 加购人数
- `averageOrderValue`: 客单价

Computed website metrics:

- `salesVolume`: `transactionAmount / averageOrderValue`
- `searchConversionRate`: `searchOrderCount / searchVolume * 100`

## Permission Boundaries

- Opening QianNiu for the scheduled collection task is pre-approved by the user.
- Feishu Base writes are not part of the current workflow.
- Feishu group notifications are not part of the current workflow.
- If the user later asks to restore Feishu writes or notifications, confirm scopes and permissions before attempting the write/send step.
