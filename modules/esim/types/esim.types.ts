export interface Esim {
  id: string
  packageName: string
  totalData: number
  usedData: number
  status: "active" | "inactive"
}
