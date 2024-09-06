import Layout from "@/layout/index.vue";
import type { RouteRecordRaw } from "vue-router";
import Home from "@/views/home/homePage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "root",
    component: Layout,
    redirect: { name: "Login" },
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
    // https://192.168.1.11:5173/#/payDetail/644dd44e-67b3-485f-8f39-1c9ea49833d
    // 使用上面的站点也是能打开的
    path: "/payDetail/:socketId",
    name: "PayDetail",
    component: () => import("@/views/pay/payDetail.vue")
  },
  {
    path: "/payedAfter",
    name: "PayedAfter",
    component: () => import("@/views/pay/payedAfter.vue")
  },
  // https://192.168.1.11:5173/#/orderConfirm/? token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiMTM1ODMzMjUwMzUiLCJSb2xlIjoyLCJpc3MiOiJpU21hcnQiLCJleHAiOjE3MjU4NzAwNTIsImlhdCI6MTcyNTYxMDg1Mn0.7TxP8_L3ew-3RwhZrn8KHfDTc3KGbAjyxqAlSAau21M& mobile=13849392993&device_id=644dd44e-67b3-485f-8f39-1c9ea49833d6& quantity=5
  {
    path: "/orderConfirm",
    name: "OrderConfirm",
    component: () => import("@/views/pay/orderConfirm.vue")
  },
  {
    // 登录
    path: "/login",
    name: "Login",
    component: () => import("@/views/auth/login.vue")
  },
  // // 使用游客登录
  // {
  //   path: "/guestUserLogin",
  //   name: "GuestUserLogin",
  //   component: () => import("@/views/auth/guestUserLogin.vue")
  // },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/auth/register.vue")
  }
];

export default routes;
