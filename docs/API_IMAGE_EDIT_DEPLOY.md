# AI 图像编辑接口说明（Vercel + Stability）

供队长 / 运维在 **Vercel 项目** 中配置环境变量并与前端联调使用。

## 1. Vercel 环境变量

在 Vercel：**Project → Settings → Environment Variables** 中添加：

| 变量名 | 必填 | 说明 |
|--------|------|------|
| `STABILITY_API_KEY` | **是** | Stability AI API Key，在 [platform.stability.ai/keys](https://platform.stability.ai/keys) 申请，**仅服务端**。 |

建议：**Production**、**Preview** 各配一份（测试额度按团队规范）。

部署后 **Redeploy** 一次，确保新变量生效。

---

## 2. HTTP 接口约定

### 2.1 路径与方法

| 项目 | 值 |
|------|-----|
| 路径 | `/api/image-edit` |
| 方法 | `POST` |
| Content-Type | `application/json` |
| 完整 URL 示例 | `https://<你的域名>.vercel.app/api/image-edit` |

支持 **OPTIONS** 预检（CORS：`Access-Control-Allow-Origin: *`）。

### 2.2 请求体（JSON）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `original_image` | `string` | 是 | 原图，支持三种形式：（1）**Data URL**：`data:image/jpeg;base64,...`；（2）**HTTPS 图片 URL**（服务端会下载）；（3）**裸 Base64**（按 JPEG 处理）。 |
| `edit_prompt` | `string` | 是 | 自然语言编辑描述，如「背景换成海滩」「衣服改为红色」。 |
| `strength` | `number` | 否 | 图生图强度，范围 **0～1**，默认 **0.55**。越大越偏离原图。 |

**请求体积**：服务端 JSON 解析上限约 **12MB**（解码后图片约 **15MB** 上限）。

示例：

```json
{
  "original_image": "data:image/png;base64,iVBORw0KGgo...",
  "edit_prompt": "将背景改为日落海滩，人物保持不变",
  "strength": 0.55
}
```

### 2.3 成功响应

- **HTTP 200**
- **Body**：**PNG 二进制**（`Content-Type: image/png`）
- 前端可用 `blob()` / `FileReader` 转为 Data URL 展示。

### 2.4 错误响应

一般为 **JSON**（非 200 时）：

```json
{
  "error": "简短说明",
  "details": "可选，上游或校验信息截断片段",
  "status": 502
}
```

常见 HTTP 状态码：

| 状态码 | 含义 |
|--------|------|
| 400 | 参数缺失、URL 非法、`http://` 图片 URL、图过大等 |
| 405 | 非 POST |
| 500 | 未配置 `STABILITY_API_KEY` |
| 502 | Stability 返回错误 |
| 504 | 上游请求超时或中断（约 90s） |

---

## 3. 上游说明（便于排错）

- 本接口在服务端调用 **Stability** `POST https://api.stability.ai/v2beta/stable-image/generate/sd3`（图 + prompt + strength，输出 PNG）。
- 账号需有可用 **Credits**；失败时可从 JSON `details` 或 Vercel 函数日志中查看 Stability 返回内容。

---

## 4. 本地开发（贡献者）

1. 安装依赖：`npm install`
2. 复制环境变量：`cp .env.example .env.local`（Windows 可手动复制），填写 `STABILITY_API_KEY`
3. 启动前端（**Vite 开发服务器已内置同名 `POST /api/image-edit`**，与线上语义一致，便于本地演示）：

   ```bash
   npm run dev
   ```

4. 可选：使用 `npm run dev:vercel` 在本地跑 Vercel CLI（需 CLI 登录、项目链接成功；部分环境可能对包管理器检测敏感）。

---

## 5. `vercel.json` 提示

已为 `api/image-edit` 配置 `maxDuration: 60`（秒）。免费套餐对执行时间有限制，若频繁超时需升级套餐或优化图片大小。

---

文档版本：与仓库内 `api/image-edit.ts` 行为一致时可一并更新本文。
