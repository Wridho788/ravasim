"use client"

import { useState } from "react"
import { Button, Checkbox, Modal, Stack, TextInput } from "@mantine/core"

import type { Device } from "../types/devices.types"

export default function AddDeviceModal({
  opened,
  onClose,
  onSubmit,
}: {
  opened: boolean
  onClose: () => void
  onSubmit: (device: Device) => void
}) {
  const [name, setName] = useState("")
  const [brand, setBrand] = useState("")
  const [esimCompatible, setEsimCompatible] = useState(true)

  const handleSubmit = () => {
    if (!name.trim() || !brand.trim()) return

    onSubmit({
      id: Date.now().toString(),
      name: name.trim(),
      brand: brand.trim(),
      esimCompatible,
    })

    setName("")
    setBrand("")
    setEsimCompatible(true)
    onClose()
  }

  return (
    <Modal opened={opened} onClose={onClose} title="Add Device">
      <Stack>
        <TextInput
          label="Device Name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />

        <TextInput
          label="Brand"
          value={brand}
          onChange={(e) => setBrand(e.currentTarget.value)}
        />

        <Checkbox
          label="eSIM compatible"
          checked={esimCompatible}
          onChange={(e) => setEsimCompatible(e.currentTarget.checked)}
        />

        <Button onClick={handleSubmit}>Save Device</Button>
      </Stack>
    </Modal>
  )
}
