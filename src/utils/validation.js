import * as Yup from "yup";

export const loginValidation = Yup.object({
  email: Yup.string().email("L'e-mail n'est pas valide").required("L'adresse e-mail est requise"),
  password: Yup.string()
    .min(6, "le mot de passe doit faire entre 6 et 20 caractères")
    .max(20, "le mot de passe doit faire entre 6 et 20 caractères")
    .required("Le mot de passe est requis"),
});

export const registerValidation = Yup.object({
  firstName: Yup.string().max(20).required("Le prénom est requis"),
  lastName: Yup.string().max(20).required("Le nom est requis"),
  contry: Yup.string().max(20),
  email: Yup.string().email("L'e-mail n'est pas valide").required("L'e-mail est requis"),
  password: Yup.string()
    .min(6, "le mot de passe doit faire entre 6 et 20 caractères")
    .max(20, "le mot de passe doit faire entre 6 et 20 caractères")
    .required("Le mot de passe est requis"),
  confirmPassword: Yup.string()
    .min(6)
    .max(20)
    .required("La confirmation du mot de passe est requise")
    .oneOf([Yup.ref("password"), null], "Les mots de passes de correspondent pas"),
  policy: Yup.boolean().oneOf([true], "Vous devez acceptez les conditions d'utlisations"),
});

export const EmailSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Email adress is not valid").required("Email adress is required"),
  message: Yup.string().required("message is required"),
});
