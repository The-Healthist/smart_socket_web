import { defineMock } from "vite-plugin-mock-dev-server";
import Mock from "mockjs";

export default defineMock([
  {
    url: "/api/list/get",
    delay: 1000,
    body: {
      code: 0,
      message: "OK",
      result: Mock.mock({
        "list|10": [
          {
            "id|+1": 1
          }
        ]
      })
    }
  },
  {
    url: "/api/list/error",
    delay: 1000,
    body: {
      code: 1,
      message: "ERROR",
      result: null
    }
  },
  {
    url: "/api/socket/:id",
    delay: 1000,
    body: {
      code: 0,
      message: "SUCCESS",
      result: Mock.mock({
        address: "XX路xxx號仁英大廈01A",
        name: "仁英大廈01A 空調插座",
        id: 1,
        imgUrl:
          "https://images.pexels.com/photos/27547456/pexels-photo-27547456.jpeg/"
      })
    }
  },
  // 游客登录接口
  {
    url: "/api/auth/login_guest",
    delay: 1000,
    body: {
      code: 0,
      message: "SUCCESS",
      result: Mock.mock({
        uuid: "324",
        type: "游客",
        token: "12345634sdfsdfsdfsdfsdfsdf"
      })
    }
  },
  // LOGIN
  {
    url: "/api/auth/login",
    delay: 1000,
    body: {
      code: 0,
      message: "SUCCESS",
      result: Mock.mock({
        uuid: "3214234",
        type: "用户",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyM0AxMjMuMTIzIiwiaXNBZG1pbiI6dHJ1ZSwiZXhwIjoxNzI0MzA5OTgxLCJpYXQiOjE3MjQxMzcxODEsImlzcyI6IkNsZXZlckRyZWFtIn0.z0bFUtuqKesT-trxVJnd2VZlPqwVjRFT844ESghGFIo"
      })
    }
  },
  // 注册接口
  {
    url: "/api/auth/register",
    delay: 1000,
    body: {
      code: 0,
      message: "SUCCESS",
      result: Mock.mock({
        uuid: "321234",
        type: "用户",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyM0AxMjM"
      })
    }
  },
  // 确认订单信息
  {
    url: "/api/order",
    delay: 1000,
    method: "POST",
    body: {
      code: 0,
      message: "SUCCESS",
      result: Mock.mock({
        // 提供一个二维码和一个跳转链接
        qrCode: "https://example.com/qrcode",
        url: "payedafter"
      })
    }
  },
  // 获取订单列表
  {
    url: "/api/order",
    method: "GET",
    delay: 1000,
    body: ({ query }) => {
      const data = [
        {
          id: 1,
          name: "仁英大廈01A 空調插座",
          address: "XX路xxx號仁英大廈01A",
          usage: "3.5kWh",
          shenyu: "6.5kWh"
        },
        {
          id: 2,
          name: "仁英大廈02B 空調插座",
          address: "XX路xxx號仁英大廈02B",
          usage: "2.8kWh",
          shenyu: "6.5kWh"
        },
        {
          id: 3,
          name: "仁英大廈03C 空調插座",
          address: "XX路xxx號仁英大廈03C",
          usage: "1.5kWh",
          shenyu: "6.5kWh"
        },
        {
          id: 4,
          name: "仁英大廈04D 空調插座",
          address: "XX路xxx號仁英大廈04D",
          usage: "4.0kWh",
          shenyu: "6.5kWh"
        }
      ];
      const ordersH = [
        {
          name: "仁英大廈01A 空調插座",
          address: "XX路xxx號仁英大廈01A",
          powerPurchased: "10kWh",
          amountPaid: "10HKD",
          orderNumber: "827857199803457",
          paymentMethod: "銀行卡",
          transactionNumber: "47178858238"
        },
        {
          name: "仁英大廈02B 空調插座",
          address: "XX路xxx號仁英大廈02B",
          powerPurchased: "5kWh",
          amountPaid: "5HKD",
          orderNumber: "827857199803458",
          paymentMethod: "微信支付",
          transactionNumber: "47178858239"
        },
        {
          name: "仁英大廈03C 空調插座",
          address: "XX路xxx號仁英大廈03C",
          powerPurchased: "8kWh",
          amountPaid: "8HKD",
          orderNumber: "827857199803459",
          paymentMethod: "支付寶",
          transactionNumber: "47178858240"
        },
        {
          name: "仁英大廈04D 空調插座",
          address: "XX路xxx號仁英大廈04D",
          powerPurchased: "12kWh",
          amountPaid: "12HKD",
          orderNumber: "827857199803460",
          paymentMethod: "銀行卡",
          transactionNumber: "47178858241"
        },
        {
          name: "仁英大廈05E 空調插座",
          address: "XX路xxx號仁英大廈05E",
          powerPurchased: "6kWh",
          amountPaid: "6HKD",
          orderNumber: "827857199803461",
          paymentMethod: "微信支付",
          transactionNumber: "47178858242"
        },
        {
          name: "仁英大廈06F 空調插座",
          address: "XX路xxx號仁英大廈06F",
          powerPurchased: "15kWh",
          amountPaid: "15HKD",
          orderNumber: "827857199803462",
          paymentMethod: "支付寶",
          transactionNumber: "47178858243"
        }
      ];
      console.log(query.status);
      if (query.status === "1") {
        return {
          code: 0,
          message: "SUCCESS",
          result: Mock.mock(ordersH)
        };
      } else {
        return {
          code: 0,
          message: "SUCCESS",
          result: Mock.mock(data)
        };
      }
    }
  },
  // 获取订单详情
  {
    url: "/api/order/:id",
    method: "GET",
    delay: 1000,
    body: ({ params }) => {
      if (params.id === "1")
        return {
          code: 0,
          message: "SUCCESS",
          result: Mock.mock({
            name: "仁英大廈01A 空調插座",
            address: "XX路xxx號仁英大廈01A",
            powerPurchased: "10kWh",
            amountPaid: "10HKD",
            orderNumber: "827857199803457",
            paymentMethod: "銀行卡",
            transactionNumber: "47178858238",
            creationTime: "2024-09-01 14:32"
          })
        };
      else
        return {
          code: 0,
          message: "SUCCESS",
          result: Mock.mock({
            name: "仁英大廈02B 空調插座",
            address: "XX路xxx號仁英大廈02B",
            powerPurchased: "5kWh",
            amountPaid: "5HKD",
            orderNumber: "827857199803458",
            paymentMethod: "微信支付"
          })
        };
    }
  },
  // 结束使用
  {
    url: "/api/order/:id/end",
    method: "POST",
    delay: 1000,
    body: ({ params }) => {
      const data = [
        {
          id: 2,
          name: "仁英大廈02B 空調插座",
          address: "XX路xxx號仁英大廈02B",
          usage: "2.8kWh",
          shenyu: "6.5kWh"
        },
        {
          id: 3,
          name: "仁英大廈03C 空調插座",
          address: "XX路xxx號仁英大廈03C",
          usage: "1.5kWh",
          shenyu: "6.5kWh"
        },
        {
          id: 4,
          name: "仁英大廈04D 空調插座",
          address: "XX路xxx號仁英大廈04D",
          usage: "4.0kWh",
          shenyu: "6.5kWh"
        }
      ];
      if (params.id === "1")
        return {
          code: 0,
          message: "SUCCESS",
          result: Mock.mock(data)
        };
    }
  },
  //充值续费
  {
    url: "/api/order/:orderId/renewal",
    method: "POST",
    delay: 1000,
    body: ({ params, body }) => {
      if (params.orderId === "1")
        return {
          code: 0,
          message: "SUCCESS",
          result: Mock.mock({
            orderId: params.orderId,
            duration: body.duration
          })
        };
      else
        return {
          code: 0,
          message: "SUCCESS",
          result: Mock.mock({
            orderId: params.orderId,
            duration: body.duration
          })
        };
    }
  }
]);
