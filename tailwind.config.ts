import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "rgb(var(--color-background-primary) / <alpha-value>)", // 主要背景颜色，带有透明度
        secondary: "rgb(var(--color-background-secondary) / <alpha-value>)", // 次要背景颜色，带有透明度
        base: "rgb(var(--color-background-base) / <alpha-value>)" // 通用背景颜色，带有透明度
      },
      textColor: {
        base: "rgb(var(--color-text-base) / <alpha-value>)", // 通用文本颜色，带有透明度
        muted: "rgb(var(--color-text-muted) / <alpha-value>)", // 辅助文本颜色，带有透明度
        inverted: "rgb(var(--color-text-inverted) / <alpha-value>)", // 插入文本颜色，带有透明度
        primary: "rgb(var(--color-text-primary) / <alpha-value>)", // 主要文本颜色，带有透明度
        secondary: "rgb(var(--color-text-secondary) / <alpha-value>)" // 次要文本颜色，带有透明度
      },
      borderColor: {
        primary: "rgb(var(--color-border-primary) / <alpha-value>)", // 边框颜色，带有透明度
        base: "rgb(var(--color-border-base) / <alpha-value>)", // 通用边框颜色，带有透明度
        inverted: "rgb(var(--color-border-inverted) / <alpha-value>)", // 插入边框颜色，带有透明度
        secondary: "rgb(var(--color-border-secondary) / <alpha-value>)"
      },
      colors: {
        link: {
          DEFAULT: "rgb(var(--color-link) / <alpha-value>)", // 默认链接颜色，带有透明度
          hover: "rgb(var(--color-link-hover) / <alpha-value>)" // 链接悬停颜色，带有透明度
        }
      }
    }
  },
  plugins: []
} satisfies Config;
