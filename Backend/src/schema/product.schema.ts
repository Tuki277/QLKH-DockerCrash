import { object, string } from "yup";

const payload = {
  body: object({
    UserReceive: string().trim().required("User Receive is required"),
    PhoneNumberReceive: string()
      .trim()
      .required("Phone number Receive is required")
      .min(10, "Phone number is wrong - should be 10 chars minimum."),
    AddressReceive: string().trim().required("Address Receive is required"),
    UserSendAddress: string().trim().required("User Send Address is required"),
    Weight: string().trim().required("Weight is required"),
    NameProduct: string().trim().required("NameProduct is required")
  }),
};

const params = {
    params: object({
      id: string().required("id is required"),
    }),
  };

export const createProductSchema = object({
  ...payload,
});

export const rejectProductSchema = object({
    ...params
})

export const finishProductSchema = object({
    ...params
})

export const deleteProductSchema = object({
    ...params
})

export const findProductByIdSchema = object({
  ...params
})

export const updateProductSchema = object({
  ...payload,
  ...params
})