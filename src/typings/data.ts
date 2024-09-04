// base64
export function encodeFormData(
  mobile: string,
  password: string,
  email?: string
): string {
  let data = { mobile, password, email };
  if (email) {
    data.email = email;
  }
  const jsonString = JSON.stringify(data);
  return btoa(jsonString); // Base64 编码
}
//解码
export function decodeFormData(encodedData: string): any {
  const decodedData = atob(encodedData); // Base64 解码
  return JSON.parse(decodedData);
}

//校验规则
export function validateField(field: string, value: string): boolean {
  switch (field) {
    case "email":
      // 正则表达式用于验证邮箱
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    case "mobile":
      // 正则表达式用于验证手机号（6-12位数字）
      return /^\d{6,12}$/.test(value);
    case "password":
      // 正则表达式用于验证密码（6-16位任意字符）
      return /^.{6,16}$/.test(value);
    default:
      return false;
  }
}
