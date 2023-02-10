import * as Yup from "yup";

// Yup Login Schema
export const loginSchema = Yup.object().shape(
  {
    name: Yup.string().when("isRegister", {
      is: true,
      then: (rule) =>
        rule
          .min(2, "Name should have atleast 2 characters")
          .required("Name is required"),
    }),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password should be of minimum 6 characters")
      .required("Password is required"),
    isRegister: Yup.boolean(),
  },
  ["isRegister", "isRegister"]
);

// Yup New Note Schema
export const noteSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  content: Yup.string(),
  category: Yup.string().required("Please select a category"),
});
