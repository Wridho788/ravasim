import { createTheme } from "@mantine/core"

export const theme = createTheme({
  primaryColor: "brand",

  colors: {
    brand: [
      "#e7f0ff",
      "#cfe0ff",
      "#9ec2ff",
      "#6ca3ff",
      "#3b85ff",
      "#0a66ff",
      "#084dcc",
      "#063999",
      "#042666",
      "#021333",
    ],
  },

  defaultRadius: "md",
  fontFamily:
    "var(--font-geist-sans), system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
  headings: {
    fontFamily:
      "var(--font-geist-sans), system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
  },
})
