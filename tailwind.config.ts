import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // 定义背景颜色相关的配置，包括主色、次色、背景色等，用于界面的不同部分
      backgroundColor: {
        primary: "rgb(var(--color-primary) / <alpha-value>)", // 主要背景颜色，带有透明度
        secondary: "rgb(var(--color-secondary) / <alpha-value>)", // 次要背景颜色，带有透明度
        background: "rgb(var(--color-background) / <alpha-value>)", // 通用背景颜色，带有透明度
        backgroundsecondary:
          "rgb(var(--color-background-secondary) / <alpha-value>)", // 额外的背景颜色，带有透明度
        card: "rgb(var(--color-card-background) / <alpha-value>)", // 卡片背景颜色，带有透明度
        separator: "rgb(var(--color-separator) / <alpha-value>)" // 分隔符颜色，带有透明度
      },
      // 定义文本颜色相关的配置，包括主色和次色，用于界面文本显示
      textColor: {
        primary: "rgb(var(--color-text-primary) / <alpha-value>)", // 主要文本颜色，带有透明度
        secondary: "rgb(var(--color-text-secondary) / <alpha-value>)" // 次要文本颜色，带有透明度
      },
      // 定义边框颜色相关的配置，用于界面元素的边框
      borderColor: {
        primary: "rgb(var(--color-border) / <alpha-value>)" // 边框颜色，带有透明度
      },
      // 定义链接颜色相关的配置，包括默认状态和悬停状态
      linkColor: {
        default: "rgb(var(--color-link) / <alpha-value>)", // 默认链接颜色，带有透明度
        hover: "rgb(var(--color-link-hover) / <alpha-value>)" // 链接悬停颜色，带有透明度
      },
      // 定义错误状态的颜色配置
      errorColor: {
        default: "rgb(var(--color-error) / <alpha-value>)" // 错误状态颜色，带有透明度
      },
      // 定义成功状态的颜色配置
      successColor: {
        default: "rgb(var(--color-success) / <alpha-value>)" // 成功状态颜色，带有透明度
      }
    }
  },
  plugins: []
} satisfies Config;
