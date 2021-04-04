import React from "react"
import { Form, Col, Button, Spinner } from "react-bootstrap"
import "../../assets/css/login.css"
import { Formik } from "formik"
import { useAuthContext } from "../../context"
import { useHistory } from "react-router-dom"
import axios from "axios"
import { RegisterSchema } from "../../validation_schemas"

const baseUrl = "/api/user"

//register form page
const Register = () => {
  const history = useHistory()

  //on submit, send data to db to register user
  //register should redirect to login
  const handleRegister = (creds, { setSubmitting }) => {
    const submit = async () => {
      const { firstname, lastname, email, password } = creds
      try {
        const response = await axios.post(
          baseUrl,
          {
            firstname,
            lastname,
            email,
            password,
          },
          {
            "content-type": "application/json",
            "access-control-allow-origin": "*",
          }
        )
        console.log(response)
        setSubmitting(false)
        /*if (response.data) {
          //localStorage.setItem("user", JSON.stringify(data))
          //localStorage.setItem("token", "fakeToken")
          //loginUser(authContext.dispatch, data)
          history.push("/login")
        }*/
      } catch (err) {
        console.log(err.response.data.message)
        setSubmitting(false)
      }
    }
    submit()
  }
  return (
    <div className="Login">
      <h1>Register</h1>
      <Formik
        validationSchema={RegisterSchema}
        onSubmit={handleRegister}
        initialValues={{
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          touched,
          errors,
          isSubmitting,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridFirst">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First name"
                  value={values.firstname}
                  name="firstname"
                  onChange={handleChange}
                  isInvalid={!!errors.firstname}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridLast">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last name"
                  value={values.lastname}
                  name="lastname"
                  onChange={handleChange}
                  isInvalid={!!errors.lastname}
                />
              </Form.Group>
            </Form.Row>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={values.email}
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
                isInvalid={!!errors.password}
              />
              {errors.password && touched.password ? (
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formBasicPasswordConfirm">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={handleChange}
                isInvalid={!!errors.confirmPassword}
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
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

export default Register
