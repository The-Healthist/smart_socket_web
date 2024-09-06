import { http } from "@/utils/http";

type formDataLogin = {
  mobile: string;
  password: string;
};
type formDataResigister = {
  mobile: string;
  password: string;
  email?: string;
  formData?: string;
  token?: string;
};
export function Login(body: formDataLogin) {
  return http.request({
    url: "/api/common/login",
    method: "post",
    data: body
  });
}

export function Register(body: formDataResigister) {
  return http.request({
    url: "/api/common/register",
    method: "post",
    data: body
  });
}

export function guestUserLogin() {
  return http.request({
    url: "/api/common/login_guest",
    method: "post"
  });
}
