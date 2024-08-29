// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "file:///H:/SmartSocket/node_modules/vite/dist/node/index.js";
import vue from "file:///H:/SmartSocket/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///H:/SmartSocket/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import Components from "file:///H:/SmartSocket/node_modules/unplugin-vue-components/dist/vite.js";
import { VantResolver } from "file:///H:/SmartSocket/node_modules/unplugin-vue-components/dist/resolvers.js";
import { createSvgIconsPlugin } from "file:///H:/SmartSocket/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import path from "path";
import mockDevServerPlugin from "file:///H:/SmartSocket/node_modules/vite-plugin-mock-dev-server/dist/index.js";
import vueSetupExtend from "file:///H:/SmartSocket/node_modules/vite-plugin-vue-setup-extend/dist/index.mjs";
import viteCompression from "file:///H:/SmartSocket/node_modules/vite-plugin-compression/dist/index.mjs";
import { createHtmlPlugin } from "file:///H:/SmartSocket/node_modules/vite-plugin-html/dist/index.mjs";

// build/cdn.ts
import { cdn } from "file:///H:/SmartSocket/node_modules/vite-plugin-cdn2/dist/index.mjs";
import { unpkg } from "file:///H:/SmartSocket/node_modules/vite-plugin-cdn2/dist/resolver/unpkg.mjs";
function enableCDN(isEnabled) {
  if (isEnabled === "true") {
    return cdn({
      resolve: unpkg(),
      modules: ["vue", "vue-demi", "pinia", "axios", "vant", "vue-router"]
    });
  }
}

// vite.config.ts
var __vite_injected_original_import_meta_url = "file:///H:/SmartSocket/vite.config.ts";
var root = process.cwd();
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, root, "");
  return {
    base: env.VITE_PUBLIC_PATH || "/",
    plugins: [
      vue(),
      vueJsx(),
      mockDevServerPlugin(),
      // vant 组件自动按需引入
      Components({
        dts: "src/typings/components.d.ts",
        resolvers: [VantResolver()]
      }),
      // svg icon
      createSvgIconsPlugin({
        // 指定图标文件夹
        iconDirs: [path.resolve(root, "src/icons/svg")],
        // 指定 symbolId 格式
        symbolId: "icon-[dir]-[name]"
      }),
      // 允许 setup 语法糖上添加组件名属性
      vueSetupExtend(),
      // 生产环境 gzip 压缩资源
      viteCompression(),
      // 注入模板数据
      createHtmlPlugin({
        inject: {
          data: {
            ENABLE_ERUDA: env.VITE_ENABLE_ERUDA || "false"
          }
        }
      }),
      // 生产环境默认不启用 CDN 加速
      enableCDN(env.VITE_CDN_DEPS)
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
      }
    },
    server: {
      host: true,
      // 仅在 proxy 中配置的代理前缀， mock-dev-server 才会拦截并 mock
      // doc: https://github.com/pengzhanbo/vite-plugin-mock-dev-server
      proxy: {
        "^/dev-api": {
          target: ""
        }
      }
    },
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]"
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYnVpbGQvY2RuLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiSDpcXFxcU21hcnRTb2NrZXRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkg6XFxcXFNtYXJ0U29ja2V0XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9IOi9TbWFydFNvY2tldC92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gXCJub2RlOnVybFwiO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xuaW1wb3J0IHZ1ZUpzeCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlLWpzeFwiO1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGVcIjtcbmltcG9ydCB7IFZhbnRSZXNvbHZlciB9IGZyb20gXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnNcIjtcbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSBcInZpdGUtcGx1Z2luLXN2Zy1pY29uc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCBtb2NrRGV2U2VydmVyUGx1Z2luIGZyb20gXCJ2aXRlLXBsdWdpbi1tb2NrLWRldi1zZXJ2ZXJcIjtcbmltcG9ydCB2dWVTZXR1cEV4dGVuZCBmcm9tIFwidml0ZS1wbHVnaW4tdnVlLXNldHVwLWV4dGVuZFwiO1xuaW1wb3J0IHZpdGVDb21wcmVzc2lvbiBmcm9tIFwidml0ZS1wbHVnaW4tY29tcHJlc3Npb25cIjtcbmltcG9ydCB7IGNyZWF0ZUh0bWxQbHVnaW4gfSBmcm9tIFwidml0ZS1wbHVnaW4taHRtbFwiO1xuaW1wb3J0IHsgZW5hYmxlQ0ROIH0gZnJvbSBcIi4vYnVpbGQvY2RuXCI7XG5cbi8vIFx1NUY1M1x1NTI0RFx1NURFNVx1NEY1Q1x1NzZFRVx1NUY1NVx1OERFRlx1NUY4NFxuY29uc3Qgcm9vdDogc3RyaW5nID0gcHJvY2Vzcy5jd2QoKTtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcbiAgLy8gXHU3M0FGXHU1ODgzXHU1M0Q4XHU5MUNGXG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcm9vdCwgXCJcIik7XG4gIHJldHVybiB7XG4gICAgYmFzZTogZW52LlZJVEVfUFVCTElDX1BBVEggfHwgXCIvXCIsXG4gICAgcGx1Z2luczogW1xuICAgICAgdnVlKCksXG4gICAgICB2dWVKc3goKSxcbiAgICAgIG1vY2tEZXZTZXJ2ZXJQbHVnaW4oKSxcbiAgICAgIC8vIHZhbnQgXHU3RUM0XHU0RUY2XHU4MUVBXHU1MkE4XHU2MzA5XHU5NzAwXHU1RjE1XHU1MTY1XG4gICAgICBDb21wb25lbnRzKHtcbiAgICAgICAgZHRzOiBcInNyYy90eXBpbmdzL2NvbXBvbmVudHMuZC50c1wiLFxuICAgICAgICByZXNvbHZlcnM6IFtWYW50UmVzb2x2ZXIoKV1cbiAgICAgIH0pLFxuICAgICAgLy8gc3ZnIGljb25cbiAgICAgIGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcbiAgICAgICAgLy8gXHU2MzA3XHU1QjlBXHU1NkZFXHU2ODA3XHU2NTg3XHU0RUY2XHU1OTM5XG4gICAgICAgIGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKHJvb3QsIFwic3JjL2ljb25zL3N2Z1wiKV0sXG4gICAgICAgIC8vIFx1NjMwN1x1NUI5QSBzeW1ib2xJZCBcdTY4M0NcdTVGMEZcbiAgICAgICAgc3ltYm9sSWQ6IFwiaWNvbi1bZGlyXS1bbmFtZV1cIlxuICAgICAgfSksXG4gICAgICAvLyBcdTUxNDFcdThCQjggc2V0dXAgXHU4QkVEXHU2Q0Q1XHU3Q0Q2XHU0RTBBXHU2REZCXHU1MkEwXHU3RUM0XHU0RUY2XHU1NDBEXHU1QzVFXHU2MDI3XG4gICAgICB2dWVTZXR1cEV4dGVuZCgpLFxuICAgICAgLy8gXHU3NTFGXHU0RUE3XHU3M0FGXHU1ODgzIGd6aXAgXHU1MzhCXHU3RjI5XHU4RDQ0XHU2RTkwXG4gICAgICB2aXRlQ29tcHJlc3Npb24oKSxcbiAgICAgIC8vIFx1NkNFOFx1NTE2NVx1NkEyMVx1Njc3Rlx1NjU3MFx1NjM2RVxuICAgICAgY3JlYXRlSHRtbFBsdWdpbih7XG4gICAgICAgIGluamVjdDoge1xuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIEVOQUJMRV9FUlVEQTogZW52LlZJVEVfRU5BQkxFX0VSVURBIHx8IFwiZmFsc2VcIlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICAvLyBcdTc1MUZcdTRFQTdcdTczQUZcdTU4ODNcdTlFRDhcdThCQTRcdTRFMERcdTU0MkZcdTc1MjggQ0ROIFx1NTJBMFx1OTAxRlxuICAgICAgZW5hYmxlQ0ROKGVudi5WSVRFX0NETl9ERVBTKVxuICAgIF0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgXCJAXCI6IGZpbGVVUkxUb1BhdGgobmV3IFVSTChcIi4vc3JjXCIsIGltcG9ydC5tZXRhLnVybCkpXG4gICAgICB9XG4gICAgfSxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIGhvc3Q6IHRydWUsXG4gICAgICAvLyBcdTRFQzVcdTU3MjggcHJveHkgXHU0RTJEXHU5MTREXHU3RjZFXHU3Njg0XHU0RUUzXHU3NDA2XHU1MjREXHU3RjAwXHVGRjBDIG1vY2stZGV2LXNlcnZlciBcdTYyNERcdTRGMUFcdTYyRTZcdTYyMkFcdTVFNzYgbW9ja1xuICAgICAgLy8gZG9jOiBodHRwczovL2dpdGh1Yi5jb20vcGVuZ3poYW5iby92aXRlLXBsdWdpbi1tb2NrLWRldi1zZXJ2ZXJcbiAgICAgIHByb3h5OiB7XG4gICAgICAgIFwiXi9kZXYtYXBpXCI6IHtcbiAgICAgICAgICB0YXJnZXQ6IFwiXCJcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgYnVpbGQ6IHtcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgY2h1bmtGaWxlTmFtZXM6IFwic3RhdGljL2pzL1tuYW1lXS1baGFzaF0uanNcIixcbiAgICAgICAgICBlbnRyeUZpbGVOYW1lczogXCJzdGF0aWMvanMvW25hbWVdLVtoYXNoXS5qc1wiLFxuICAgICAgICAgIGFzc2V0RmlsZU5hbWVzOiBcInN0YXRpYy9bZXh0XS9bbmFtZV0tW2hhc2hdLltleHRdXCJcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcbn0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJIOlxcXFxTbWFydFNvY2tldFxcXFxidWlsZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiSDpcXFxcU21hcnRTb2NrZXRcXFxcYnVpbGRcXFxcY2RuLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9IOi9TbWFydFNvY2tldC9idWlsZC9jZG4udHNcIjtpbXBvcnQgeyBjZG4gfSBmcm9tIFwidml0ZS1wbHVnaW4tY2RuMlwiO1xuaW1wb3J0IHsgdW5wa2cgfSBmcm9tIFwidml0ZS1wbHVnaW4tY2RuMi9yZXNvbHZlci91bnBrZ1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gZW5hYmxlQ0ROKGlzRW5hYmxlZDogc3RyaW5nKSB7XG4gIGlmIChpc0VuYWJsZWQgPT09IFwidHJ1ZVwiKSB7XG4gICAgcmV0dXJuIGNkbih7XG4gICAgICByZXNvbHZlOiB1bnBrZygpLFxuICAgICAgbW9kdWxlczogW1widnVlXCIsIFwidnVlLWRlbWlcIiwgXCJwaW5pYVwiLCBcImF4aW9zXCIsIFwidmFudFwiLCBcInZ1ZS1yb3V0ZXJcIl1cbiAgICB9KTtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFnTyxTQUFTLGVBQWUsV0FBVztBQUNuUSxTQUFTLGNBQWMsZUFBZTtBQUN0QyxPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBQ25CLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsNEJBQTRCO0FBQ3JDLE9BQU8sVUFBVTtBQUNqQixPQUFPLHlCQUF5QjtBQUNoQyxPQUFPLG9CQUFvQjtBQUMzQixPQUFPLHFCQUFxQjtBQUM1QixTQUFTLHdCQUF3Qjs7O0FDWG1NLFNBQVMsV0FBVztBQUN4UCxTQUFTLGFBQWE7QUFFZixTQUFTLFVBQVUsV0FBbUI7QUFDM0MsTUFBSSxjQUFjLFFBQVE7QUFDeEIsV0FBTyxJQUFJO0FBQUEsTUFDVCxTQUFTLE1BQU07QUFBQSxNQUNmLFNBQVMsQ0FBQyxPQUFPLFlBQVksU0FBUyxTQUFTLFFBQVEsWUFBWTtBQUFBLElBQ3JFLENBQUM7QUFBQSxFQUNIO0FBQ0Y7OztBRFZ1SSxJQUFNLDJDQUEyQztBQWV4TCxJQUFNLE9BQWUsUUFBUSxJQUFJO0FBR2pDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBRXhDLFFBQU0sTUFBTSxRQUFRLE1BQU0sTUFBTSxFQUFFO0FBQ2xDLFNBQU87QUFBQSxJQUNMLE1BQU0sSUFBSSxvQkFBb0I7QUFBQSxJQUM5QixTQUFTO0FBQUEsTUFDUCxJQUFJO0FBQUEsTUFDSixPQUFPO0FBQUEsTUFDUCxvQkFBb0I7QUFBQTtBQUFBLE1BRXBCLFdBQVc7QUFBQSxRQUNULEtBQUs7QUFBQSxRQUNMLFdBQVcsQ0FBQyxhQUFhLENBQUM7QUFBQSxNQUM1QixDQUFDO0FBQUE7QUFBQSxNQUVELHFCQUFxQjtBQUFBO0FBQUEsUUFFbkIsVUFBVSxDQUFDLEtBQUssUUFBUSxNQUFNLGVBQWUsQ0FBQztBQUFBO0FBQUEsUUFFOUMsVUFBVTtBQUFBLE1BQ1osQ0FBQztBQUFBO0FBQUEsTUFFRCxlQUFlO0FBQUE7QUFBQSxNQUVmLGdCQUFnQjtBQUFBO0FBQUEsTUFFaEIsaUJBQWlCO0FBQUEsUUFDZixRQUFRO0FBQUEsVUFDTixNQUFNO0FBQUEsWUFDSixjQUFjLElBQUkscUJBQXFCO0FBQUEsVUFDekM7QUFBQSxRQUNGO0FBQUEsTUFDRixDQUFDO0FBQUE7QUFBQSxNQUVELFVBQVUsSUFBSSxhQUFhO0FBQUEsSUFDN0I7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsTUFDdEQ7QUFBQSxJQUNGO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixNQUFNO0FBQUE7QUFBQTtBQUFBLE1BR04sT0FBTztBQUFBLFFBQ0wsYUFBYTtBQUFBLFVBQ1gsUUFBUTtBQUFBLFFBQ1Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0wsZUFBZTtBQUFBLFFBQ2IsUUFBUTtBQUFBLFVBQ04sZ0JBQWdCO0FBQUEsVUFDaEIsZ0JBQWdCO0FBQUEsVUFDaEIsZ0JBQWdCO0FBQUEsUUFDbEI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
