import React from "react"
import { useHistory } from "react-router-dom"
import { Form, Button, Spinner } from "react-bootstrap"
import { Formik } from "formik"
import axios from "axios"
import { loginUser, useAuthContext } from "../../context"
import { LoginSchema } from "../../validation_schemas"

const baseUrl = "/api/login"

//login from page
const Login = (props) => {
  const history = useHistory()
  const authContext = useAuthContext()
  const userInfo = authContext.auth
  console.log(userInfo)

  //on login, post credentials to server, update context, update localStorage, and then redirect to home page
  const handleLogin = (creds, { setSubmitting }) => {
    const submit = async () => {
      try {
        console.log(creds)

        //make api call to route
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
        //if success
        if (data) {
          //add to local storage
          localStorage.setItem("user", JSON.stringify(payload))
          localStorage.setItem("token", "fakeToken")
          //update auth context state
          loginUser(authContext.dispatch, payload)
          //redirect to home page
          history.push("/home")
        }
      } catch (error) {
        //handle error response

        setSubmitting(false)
      }
    }
    submit()
  }

  //return form for login
  return (
    <div className="Login">
      <Formik
        validationSchema={LoginSchema}
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
  )
}

export default Login
