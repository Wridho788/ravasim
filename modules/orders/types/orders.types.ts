export interface Order {
  id: string
  packageId: string
  packageName: string
  price: number
  paymentMethod: string
  status: "success" | "pending"
}
