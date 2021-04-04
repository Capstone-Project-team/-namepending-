import * as yup from "yup"

//schema used by yup to validate the form inputs
export const DonationSchema = yup.object().shape({
  donation: yup
    .string()
    .min(1, "must request at least $1")
    .max(6, "can't request more than $99,999")
    .test("amount", "must be greater than 5", (value) => {
      if (value === undefined) value = ""
      //get either empty string or string of numbers without comma
      let new_value = value === undefined ? "" : value.replace(/,/g, "")
      //if donation is above $5
      if (parseInt(new_value) >= 5) return true
      return false
    })
    .required(),
})

//validation schema for login form
export const LoginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(24, "Password must be between 6 and 24 characters long")
    .required("Required"),
})

export const NewCampaignSchema = yup.object().shape({
  funding_Goal: yup
    .string()
    .min(1, "must request at least $1")
    .max(6, "can't request more than $99,999")
    .required(),
  date_End: yup.date().required(),
  name: yup.string().min(4).max(24).required(),
  fundraiser_description: yup.string().min(5).required(),
})

export const RegisterSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  firstname: yup
    .string()
    .min(2, "First name min length")
    .max(24, "Password must be between 6 and 24 characters long")
    .required("Required"),
  lastname: yup
    .string()
    .min(2, "Last name min length")
    .max(24, "Password must be between 6 and 24 characters long")
    .required("Required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(24, "Password must be between 6 and 24 characters long")
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Passwords must match"),
})
