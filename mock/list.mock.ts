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
    body: {
      code: 0,
      message: "SUCCESS",
      result: Mock.mock({
        // 提供一个二维码和一个跳转链接
        qrCode: "https://example.com/qrcode",
        url: "payedafter"
      })
    }
  }
]);
