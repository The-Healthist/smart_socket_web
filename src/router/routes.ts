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
          title: "首页"
        }
      },
      {
        path: "order",
        name: "Order",
        component: () => import("@/views/order/orderPage.vue"),
        meta: {
          title: "订单"
        }
      },
      //订单详情
      {
        path: "orderDetail",
        name: "OrderDetail",
        component: () => import("@/views/order/orderDetail.vue")
      },
      {
        path: "auth",
        name: "Auth",
        component: () => import("@/views/auth/authPage.vue"),
        meta: {
          title: "我的",
          noCache: true
        }
      },
      {
        path: "setting",
        name: "Setting",
        component: () => import("@/views/setting/settingPage.vue"),
        meta: {
          title: "设置"
        }
      }
    ]
  },
  {
    path: "/scanner",
    name: "Scanner",
    component: () => import("@/views/scanner/scannerPage.vue"),
    meta: {
      title: "扫码"
    }
  },
  {
    // 可选后面添加id
    path: "/payDetail/:id",
    name: "PayDetail",
    component: () => import("@/views/pay/payDetail.vue")
  },
  {
    path: "/payedAfter",
    name: "PayedAfter",
    component: () => import("@/views/pay/payedAfter.vue")
  },
  {
    path: "/orderConfime",
    name: "OrderConfime",
    component: () => import("@/views/pay/orderConfime.vue")
  },
  {
    // 登录
    path: "/login",
    name: "Login",
    component: () => import("@/views/auth/login.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/auth/register.vue")
  }
];

export default routes;
