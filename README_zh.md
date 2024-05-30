# Snap礼包计算器

Snap礼包计算器是一款用来计算Marvel Snap礼包价值的Web应用。

## 致谢

当前的计算逻辑参考了[漫威Snap-校草](https://www.bilibili.com/video/BV1K1421d7WB/)视频中的内容，在此对视频制作者表示感谢。

## 使用方法

1. 打开 [https://snap-calculator.vercel.app/](https://snap-calculator.vercel.app/).
2. 输入礼包详情（如变体数量等）
3. 输入礼包价格（目前仅支持美元）
4. 点击 "Value it!" 进行计算

## 待完成功能
- 含紫色钥匙的礼包计算
- 用金币购买的礼包计算
- 国际化（更多货币、语言，包括未来上线的国服）

## 安装（本地）
1. Clone仓库:

   ```bash
   git clone https://github.com/lemonteaau/snap-bundle-calculator.git
   cd snap-bundle-calculator
   ```

2. 安装依赖:

   ```bash
   bun install
   ```

3. 运行Dev Server:

   ```bash
   bun run dev
   ```

   在浏览器打开[http://localhost:3000](http://localhost:3000)查看.

## 技术栈

- Next.js
- Tailwind CSS
- shadcn/ui
- Bun

## 声明

此工具与 Marvel Snap、Second Dinner 或其任何附属公司没有隶属关系，也未获得其认可、赞助或特别批准。所有产品名称、标识和品牌均为其各自所有者的财产。使用这些名称、标识和品牌并不表示得到认可。

## 贡献

欢迎PR、Issue以及各种形式的贡献！

## 许可证

此项目采用[MIT License](https://github.com/lemonteaau/snap-bundle-calculator/blob/main/LICENSE).
