import React, { useState } from "react"

import { Container, Form, Col, InputGroup, Button } from "react-bootstrap"
import UserNavbar from "./UserNavbar"
import { Formik } from "formik"
import * as yup from "yup"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const schema = yup.object().shape({
  funding_Goal: yup
    .string()
    .min(1, "must request at least $1")
    .max(6, "can't request more than $99,999")
    .required(),
  date_End: yup.date().required(),
  name: yup.string().min(4).max(24).required(),
  fundraiser_description: yup.string().min(5).required(),
  terms: yup.bool().required().oneOf([true], "Terms must be accepted"),
})

//form to create to new campaign posting
const NewCampaign = () => {
  const [state, setState] = useState(false)
  const handleCampaign = (creds) => {
    console.log(creds)
    setState(true)
  }

  const handleAmountChange = (e, setFieldValue) => {
    const re = /^[0-9\b]+$/
    let value = e.target.value.replace(/,/g, "")
    console.log("value", value)
    if (value === "" || re.test(value)) {
      console.log("new val", value)
      setFieldValue("funding_Goal", value.replace(/\B(?=(\d{3})+(?!\d))/g, ","))
    }
  }
  return (
    <div>
      <UserNavbar />
      <Container>
        <br />
        <Formik
          validationSchema={schema}
          onSubmit={handleCampaign}
          initialValues={{
            date_End: "",
            name: "",
            funding_Goal: "",
            fundraiser_description: "",
            terms: false,
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
            setFieldValue,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group md="4" controlId="fundraiserName">
                <Form.Label>Fundraiser Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={touched.name && !!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group md="4" controlId="endDate">
                <InputGroup hasValidation>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend">
                      End Date
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    as={DatePicker}
                    placeholderText="Click to select a date"
                    selected={values.date_End}
                    minDate={new Date()}
                    name="date_End"
                    onChange={(date) => setFieldValue("date_End", date)}
                    isInvalid={touched.date_End && !!errors.date_End}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.date_End}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group md="4" controlId="fundingGoal">
                <Form.Label>Funding Goal</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend2">$</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="text"
                    placeholder="Funding Goal"
                    aria-describedby="inputGroupPrepend"
                    name="funding_Goal"
                    value={values.funding_Goal}
                    onChange={(e) => handleAmountChange(e, setFieldValue)}
                    isInvalid={touched.funding_Goal && !!errors.funding_Goal}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.funding_Goal}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group md="6" controlId="fundingDescription">
                <Form.Label>Fundraiser Description</Form.Label>
                <Form.Control
                  type="text"
                  as="textarea"
                  placeholder="Give a description of your fundraiser"
                  name="fundraiser_description"
                  value={values.fundraiser_description}
                  onChange={handleChange}
                  isInvalid={
                    touched.fundraiser_description &&
                    !!errors.fundraiser_description
                  }
                />

                <Form.Control.Feedback type="invalid">
                  {errors.fundraiser_description}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Check
                  required
                  name="terms"
                  label="Agree to terms and conditions"
                  onChange={handleChange}
                  isInvalid={touched.terms && !!errors.terms}
                  feedback={errors.terms}
                  id="validationFormik0"
                />
              </Form.Group>
              <Button type="submit">Create Campaign</Button>
              {state && <pre>{JSON.stringify(values, null, 2)}</pre>}
            </Form>
          )}
        </Formik>
      </Container>
    </div>
  )
}

export default NewCampaign
