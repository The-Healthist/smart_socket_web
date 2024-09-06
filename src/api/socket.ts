import { http } from "@/utils/http";

export const getSocketInfo = (params: any) => {
  return http.request({
    url: `/api/socket/${params.socketId}`,
    method: "get"
  });
};
