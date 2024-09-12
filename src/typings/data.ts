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
// 订单数据
export function encodeOrderData(data: any): string {
  const jsonString = JSON.stringify(data);
  // console.log("jsonString", jsonString);

  // 将jsonString中的外面的""去掉
  const jsonStringWithoutQuotes = jsonString.replace(/"/g, "");
  // console.log("jsonStringWithoutQuotes", jsonStringWithoutQuotes);
  // Convert JSON string to Uint8Array
  const encoder = new TextEncoder();
  const uint8Array = encoder.encode(jsonStringWithoutQuotes);

  // Convert Uint8Array to Base64
  const base64String = btoa(String.fromCharCode(...uint8Array));
  return base64String;
}

export function decodeOrderData(encodedData: string): any {
  // Convert Base64 to Uint8Array
  const decodedString = atob(encodedData);
  const uint8Array = new Uint8Array(
    [...decodedString].map(c => c.charCodeAt(0))
  );

  // Convert Uint8Array to JSON string
  const decoder = new TextDecoder();
  const jsonString = decoder.decode(uint8Array);

  return JSON.parse(jsonString);
}

//校验规则
export function validateField(field: string, value: any): boolean {
  switch (field) {
    // 大于0的整数
    case "numberM":
      return /^\d+$/.test(value) && parseInt(value) > 0;
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

// "function calc(amount) {return amount * 2}"  参数是这个字符串,然后amount是传入的参数,返回值是计算后的结果
export function executePriceFunction(amount: number, priceFunctionStr: string) {
  if (typeof priceFunctionStr !== "string") {
    throw new Error("Invalid price function string: Not a string");
  }
  const startIndex = priceFunctionStr.indexOf("{");
  const endIndex = priceFunctionStr.lastIndexOf("}");

  if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) {
    throw new Error(
      "Invalid price function string: Missing or misordered braces"
    );
  }
  const functionBody = priceFunctionStr.slice(startIndex + 1, endIndex).trim();
  const func = new Function("amount", functionBody);
  return func(amount);
}
