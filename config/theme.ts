import { Button, Card, createTheme, InputBase } from "@mantine/core"

export const theme = createTheme({
  primaryColor: "brand",

  // Force "mobile layout" even on desktop/tablet widths.
  // Mantine responsive props (sm/md/lg/xl) are based on viewport breakpoints.
  // By pushing breakpoints very high, only `base` rules apply in normal screens.
  breakpoints: {
    xs: "30em",
    sm: "999em",
    md: "999em",
    lg: "999em",
    xl: "999em",
  },

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

  defaultRadius: "lg",
  fontFamily:
    "var(--font-geist-sans), system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
  headings: {
    fontFamily:
      "var(--font-geist-sans), system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
  },

  defaultGradient: { from: "brand", to: "cyan" },

  components: {
    Card: Card.extend({
      defaultProps: {
        withBorder: true,
        shadow: "sm",
        radius: "lg",
        p: "lg",
      },
      styles: (theme) => ({
        root: {
          borderColor: theme.colors.gray[2],
        },
      }),
    }),

    Button: Button.extend({
      defaultProps: {
        radius: "md",
        size: "md",
      },
    }),

    InputBase: InputBase.extend({
      defaultProps: {
        radius: "md",
        size: "md",
      },
    }),
  },
})
