import * as Yup from "yup";

export const userSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("Please, provide a first name")
    .min(2, "Provide a first name between 2 and 12 characters long")
    .matches(/^[A-Za-z]+$/, "Only letters are allowed")
    .max(12, "Provide a first name between 2 and 12 characters long"),
  lastName: Yup.string()
    .required("Please, provide a last name")
    .min(2, "Provide a last name between 2 and 12 characters long")
    .matches(/^[A-Za-z]+$/, "Only letters are allowed")
    .max(12, "Provide a last name between 2 and 12 characters long"),
  list: Yup.array()
    .required("Pokemon list cannot be empty")
    .max(4, "Maximum of 4 Pokemons allowed"),
});
