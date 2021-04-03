import React from "react"
import { useHistory } from "react-router-dom"
import { Form, Button, Spinner } from "react-bootstrap"
import { Formik } from "formik"
import * as yup from "yup"
import LandingNavbar from "./LandingNavbar"
import axios from "axios"

import { loginUser, useAuthContext } from "../../context"

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(24, "Password must be between 6 and 24 characters long")
    .required("Required"),
})

const baseUrl = "/api/login"

//login from page
const Login = (props) => {
  const history = useHistory()
  const authContext = useAuthContext()
  const userInfo = authContext.auth
  console.log(userInfo)

  const handleLogin = (creds, { setSubmitting }) => {
    const submit = async () => {
      try {
        console.log(creds)

        const response = await axios.post(baseUrl, creds, {
          "access-control-allow-origin": "*",
        })
        const data = response.data
        setSubmitting(false)
        console.log(data)
        const payload = {
          email: data.email,
          userType: data.user_type,
        }
        if (data) {
          localStorage.setItem("user", JSON.stringify(payload))
          localStorage.setItem("token", "fakeToken")
          loginUser(authContext.dispatch, payload)
          history.push("/home")
        }
      } catch (error) {
        //console.log("error", error.response.data.error)
        setSubmitting(false)
      }
    }
    submit()
  }

  return (
    <>
      <LandingNavbar />
      <div className="Login">
        <Formik
          validationSchema={schema}
          onSubmit={handleLogin}
          initialValues={{
            email: "",
            password: "",
          }}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            touched,
            errors,
            resetForm,
            isSubmitting,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <h1>Login</h1>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  value={values.email || ""}
                  placeholder="Enter email"
                  name="email"
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />
                {errors.email && touched.email ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                ) : null}
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  value={values.password || ""}
                  isInvalid={!!errors.password}
                />
                {errors.password && touched.password ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                ) : null}
              </Form.Group>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Spinner as="span" animation="border" />
                ) : (
                  "Submit"
                )}
              </Button>
              <div>
                <pre>{JSON.stringify(values, null, 2)}</pre>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}

export default Login
