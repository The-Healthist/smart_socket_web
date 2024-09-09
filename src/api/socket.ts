import { http } from "@/utils/http";

export const getSocketInfo = (params: any) => {
  return http.request({
    url: `/api/common/device/${params.socketId}`,
    method: "get"
  });
};
