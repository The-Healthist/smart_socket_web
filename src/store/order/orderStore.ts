import { defineStore } from "pinia";

interface Order {
  startAt: string;
  endAt: string;
  quantity?: number;
  price?: number;
  remark?: string;
  deviceUuid: string;
  device?: any;
  ownerId?: number;
  owner?: any;
  orderPayment?: any;
  uuid: string;
  status: string;
  createdAt: string;
  deletedAt: string | null;
}

// {
//   "startAt": "2024-09-12T20:05:00.891+08:00",
//   "endAt": "2024-09-12T23:05:00.891+08:00",
//   "quantity": 3,
//   "price": 6,
//   "remark": "",
//   "deviceUuid": "62e38c8b-e0d9-452f-a7e8-e7602226a333",

//   "device": {
//       "name": "测试插座3",
//       "location": "",
//       "remark": "",
//       "priceFormula": "function calc(amount) {return amount * 2}",
//       "deviceTypeId": 2,
//       "deviceType": null,
//       "ownerId": 2,
//       "owner": null,
//       "uuid": "62e38c8b-e0d9-452f-a7e8-e7602226a333",
//       "createdAt": "2024-09-10T19:22:54.327+08:00",
//       "updatedAt": "2024-09-10T19:22:54.327+08:00",
//       "deletedAt": null
//   },
//   "ownerId": 1,
//   "owner": {
//       "id": 1,
//       "createdAt": "2024-09-10T19:25:02.187+08:00",
//       "updatedAt": "2024-09-10T19:25:02.187+08:00",
//       "deletedAt": null,
//       "username": null,
//       "mobile": "13583325035",
//       "email": null,
//       "isGuest": false,
//       "active": true
//   },
//   "orderPayment": null,
//   "uuid": "5070bc51-3bf1-4495-af8c-c91eb1a3d008",
//   "status": "pending",
//   "createdAt": "2024-09-12T20:05:00.891+08:00",
//   "deletedAt": null
// },

export const useOrderStore = defineStore({
  id: "order",
  state: () => ({
    orderList: [] as Order[],
    orderListH: [] as Order[]
  }),
  actions: {
    setOrderList(orderList: Order[]) {
      this.orderList = orderList;
    },
    setOrderListH(orderListH: Order[]) {
      this.orderListH = orderListH;
    },
    addOrder(order: Order[]) {
      this.orderList = [...this.orderList, ...order];
    },
    addOrderH(order: Order[]) {
      this.orderListH = [...this.orderListH, ...order];
    }
  },
  getters: {
    getOrderList: state => state.orderList,
    getOrderListH: state => state.orderListH
  }
});
