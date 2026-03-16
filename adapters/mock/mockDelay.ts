export const mockDelay = (ms = 800) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms))
