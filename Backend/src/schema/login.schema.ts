import { number, object, string } from "yup";

const payload = {
  body: object({
    Username: string().trim().required("Username is required"),
    Password: string().trim().required("Password is required"),
  }),
};

const payloadRegister = {
  body: object({
    Username: string().trim().required("Username is required"),
    FullName: string().trim().required("FullName is required"),
    PhoneNumber: string()
    .trim()
      .required("PhoneNumber is required")
      .min(10, "Phone number is wrong - should be 10 chars minimum."),
    Password: string()
    .trim()
      .required("Password is required")
      .min(6, "Password is too short - should be 6 chars minimum."),
    Gender: number().required("Gender is required"),
    Rule: number().required("Rule is required"),
  }),
};

export const loginSchema = object({
  ...payload,
});

export const registerSchema = object({
  ...payloadRegister,
});
