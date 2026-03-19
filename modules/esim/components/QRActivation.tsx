"use client"

import { Modal, Text } from "@mantine/core"

export default function QRActivation({
  opened,
  onClose,
}: {
  opened: boolean
  onClose: () => void
}) {
  return (
    <Modal opened={opened} onClose={onClose} title="eSIM Activation QR">
      <Text ta="center">[ QR CODE SIMULATION ]</Text>

      <Text size="sm" mt="md">
        Scan this QR with your device to activate eSIM.
      </Text>
    </Modal>
  )
}
