import type { Device } from "../types/devices.types"
import { addDevice, fetchDeviceDetail, fetchDevices } from "../api/mockDevices.api"

export const devicesService = {
  getDevices: async () => {
    return fetchDevices()
  },

  getDeviceDetail: async (id: string) => {
    return fetchDeviceDetail(id)
  },

  addDevice: async (device: Device) => {
    return addDevice(device)
  },
}
