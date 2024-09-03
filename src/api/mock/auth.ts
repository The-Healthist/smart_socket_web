import { http } from "@/utils/http";

type formDataLogin = {
  mobile: string;
  password: string;
};
type formDataResigister = {
  mobile: string;
  password: string;
  email: string;
  formData: string;
};
export function Login(body: formDataLogin) {
  return http.request({
    url: "/auth/login",
    method: "post",
    data: body
  });
}

export function Register(body: formDataResigister) {
  return http.request({
    url: "/auth/register",
    method: "post",
    data: body
  });
}

export function guestUserLogin() {
  return http.request({
    url: "/auth/guest",
    method: "post"
  });
}
