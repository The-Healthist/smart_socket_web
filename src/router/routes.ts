import Layout from "@/layout/index.vue";
import type { RouteRecordRaw } from "vue-router";
import Home from "@/views/home/homePage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "root",
    component: Layout,
    redirect: { name: "Home" },
    children: [
      {
        path: "home",
        name: "Home",
        component: Home,
        meta: {
          title: "主页"
        }
      },
      {
        path: "order",
        name: "Order",
        component: () => import("@/views/order/orderPage.vue"),
        meta: {
          title: "工具"
        }
      },
      {
        path: "auth",
        name: "Auth",
        component: () => import("@/views/auth/authPage.vue"),
        meta: {
          title: "关于",
          noCache: true
        }
      }
    ]
  }
];

export default routes;
