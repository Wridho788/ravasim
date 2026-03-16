import * as yup from "yup"

export const loginSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),

  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password required"),
})

export const registerSchema = yup.object({
  name: yup.string().required("Name required"),

  email: yup.string().email("Invalid email").required("Email is required"),

  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password required"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password mismatch")
    .required("Confirm password required"),
})
