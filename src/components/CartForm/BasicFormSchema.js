import * as Yup from "yup";
import i18n from '../../i18n';

const translate = i18n.t

export const BasicFormSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[a-zA-Zа-яА-я]+$/, translate("LetrasNome"))
    .min(2, translate("MinPrimeiroNome"))
    .max(20, translate("MaxPrimeiroNome"))
    .required(translate("CampoObrigatorio")),
  lastName: Yup.string()
    .matches(/^[a-zA-Zа-яА-я]+$/, translate("LetrasNome"))
    .min(2, translate("MinPrimeiroNome"))
    .max(20, translate("MaxPrimeiroNome"))
    .required(translate("CampoObrigatorio")),
  age: Yup.number()
    .typeError(translate("Número Idade"))
    .integer("The age must be an integer")
    .min(18, translate("MinNumero"))
    .max(110, translate("MaxNumero"))
    .required(translate("CampoObrigatorio")),
  phone: Yup.string()
    .matches(
      /^(?:\+)[0-9]{2}\s?(?:\()[0-9]{2}(?:\))\s?[0-9]{4,5}(?:-)[0-9]{4}$/,
      translate("TelefoneInvalido")
    )
    .required(translate("CampoObrigatorio")),
  address: Yup.string()
    .min(3, translate("MinEndereco")),
  numeroCartao: Yup.string()
    .min(10, translate("MinNumeroCartao"))
    .max(16, translate("MaxNumeroCartao"))
    .required(translate("CampoObrigatorio")),
  nomeCartao: Yup.string()
    .matches(/^[a-zA-Zа-яА-я]+$/, translate("LetrasNome"))
    .min(2, translate("MinNomeCartao"))
    .max(20, translate("MaxNomeCartao"))
    .required(translate("CampoObrigatorio")),
  cvv: Yup.string()
    .min(3, translate("MinCVV"))
    .max(3, translate("MaxCVV"))
    .required(translate("CampoObrigatorio")),
  validade: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, translate("DataValidadeInvalida"))
    .required(translate("CampoObrigatorio")),
});
