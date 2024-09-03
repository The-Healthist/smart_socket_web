import { http } from "@/utils/http";

type infoParams = {
  id: string;
};
export const getSocketInfo = (params: infoParams) => {
  return http.request({
    url: `/api/socket/${params.id}`,
    method: "get"
  });
};
