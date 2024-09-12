// Define TypeScript enums for payment methods
export enum OrderPaymentMethod {
  Cash = "cash",
  Credit = "credit",
  Debit = "debit",
  Paypal = "paypal",
  Alipay = "alipay",
  None = "none"
}

// Define TypeScript enums for payment statuses
export enum OrderPaymentStatus {
  Pending = "pending",
  Success = "success",
  Failed = "failed"
}
