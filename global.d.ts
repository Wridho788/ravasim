// Type declarations for non-TS assets imported by the app.
// Needed for side-effect style imports with TypeScript `moduleResolution: "bundler"`.

declare module "*.css" {
  const content: unknown
  export default content
}

declare module "*.scss" {
  const content: unknown
  export default content
}

declare module "*.sass" {
  const content: unknown
  export default content
}

declare module "*.less" {
  const content: unknown
  export default content
}

// CSS Modules (optional but harmless)

declare module "*.module.css" {
  const classes: Record<string, string>
  export default classes
}

declare module "*.module.scss" {
  const classes: Record<string, string>
  export default classes
}

declare module "*.module.sass" {
  const classes: Record<string, string>
  export default classes
}
