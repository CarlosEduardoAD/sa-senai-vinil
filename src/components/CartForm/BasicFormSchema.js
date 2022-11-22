import * as Yup from "yup";

export const BasicFormSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[a-zA-Zа-яА-я]+$/, "First name must contain only letters")
    .min(2, "First name must be longer than 2 characters")
    .max(20, "Too long first name")
    .required("Required field"),
  lastName: Yup.string()
    .matches(/^[a-zA-Zа-яА-я]+$/, "Last name must contain only letters")
    .min(2, "Last name must be longer than 2 characters")
    .max(20, "Too long last name")
    .required("Required field"),
  age: Yup.number()
    .typeError("Age must be a number")
    .integer("The age must be an integer")
    .min(18, "Min age is 18")
    .max(110, "Max age is 110")
    .required("Required field"),
  phone: Yup.string()
    .matches(
      /^[+]?38\s[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{2}[-\s.]?[0-9]{2}$/im,
      "Invalid phone number format"
    )
    .required("Required field"),
  address: Yup.string()
    .min(3, "The address must be longer than 3 characters"),
  numeroCartao: Yup.string()
    .min(2, "Card number must be longer than 2 characters")
    .max(16, "Card number must have at the most 16 chars"),
  nomeCartao: Yup.string()
    .matches(/^[a-zA-Zа-яА-я]+$/, "Name in the card must contain only letters")
    .min(2, "Last name must be longer than 2 characters")
    .max(20, "Too long last name"),
  cvv: Yup.string()
    .typeError("Age must be a number")
    .min(3, "Min chars are 3")
    .max(3, "Max chars are 3"),
  validade: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Data de validade inválida"),
});
