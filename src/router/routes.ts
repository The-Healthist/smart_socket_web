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
        path: "/payDetail/:socketId",
        name: "PayDetail",
        component: () => import("@/views/pay/payDetail.vue"),
        meta: {
          title: "支付详情"
        }
      },
      {
        path: "/payedAfter",
        name: "PayedAfter",
        component: () => import("@/views/pay/payedAfter.vue"),
        meta: {
          title: "支付成功"
        }
      },
      {
        path: "/payedFailed",
        name: "PayedFailed",
        component: () => import("@/views/pay/payedFaied.vue"),
        meta: {
          title: "支付失败"
        }
      },
      // https://192.168.1.11:5173/#/orderConfirm/? token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiMTM1ODMzMjUwMzUiLCJSb2xlIjoyLCJpc3MiOiJpU21hcnQiLCJleHAiOjE3MjU4NzAwNTIsImlhdCI6MTcyNTYxMDg1Mn0.7TxP8_L3ew-3RwhZrn8KHfDTc3KGbAjyxqAlSAau21M& mobile=13849392993&device_id=644dd44e-67b3-485f-8f39-1c9ea49833d6& quantity=5
      {
        path: "/orderConfirm",
        name: "OrderConfirm",
        component: () => import("@/views/pay/orderConfirm.vue"),
        meta: {
          title: "订单确认"
        }
      },
      {
        // 登录
        path: "/login",
        name: "Login",
        component: () => import("@/views/auth/login.vue"),
        meta: {
          title: "登录"
        }
      },
      {
        path: "/register",
        name: "Register",
        component: () => import("@/views/auth/register.vue"),
        meta: {
          title: "注册"
        }
      },
      {
        path: "/afterRegister",
        name: "AfterRegister",
        component: () => import("@/views/pay/afterRegister.vue"),
        meta: {
          title: "注册成功"
        }
      }
    ]
  }
];

export default routes;
