import React from "react"
import { Container, Form, InputGroup, Button, Row, Col } from "react-bootstrap"
import { Formik } from "formik"
import * as yup from "yup"

const schema = yup.object().shape({
  donation: yup
    .string()
    .min(1, "must request at least $1")
    .max(6, "can't request more than $99,999")
    .test("amount", "must be greater than 5", (value) => {
      console.log(value)
      if (value === undefined) value = ""
      let new_value = value === undefined ? "" : value.replace(/,/g, "")
      console.log(new_value)
      if (parseInt(new_value) >= 5) return true
      return false
    })
    .required(),
})

//puts a comma in the amound of money entered, for example 2,000 | 20,000 | etc
//makes sure state is only updated on number input. No alphabetic input
const handleAmountChange = (e, setFieldValue) => {
  const re = /^[0-9\b]+$/
  let value = e.target.value.replace(/,/g, "")
  if (value === "" || re.test(value)) {
    console.log("new val", value)
    setFieldValue("donation", value.replace(/\B(?=(\d{3})+(?!\d))/g, ","))
  }
}

//page that accepts donations once the 'donate' button is clicked on a campaign
const Donate = (props) => {
  const card = props.location.state
  const handleDonation = (creds) => {
    console.log(creds)
  }
  return (
    <>
      <h1 className="text-center">{card.title}</h1>
      <Formik
        validationSchema={schema}
        onSubmit={handleDonation}
        initialValues={{
          donation: "",
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
            <pre>{JSON.stringify(errors, null, 2)}</pre>
            <Row>
              <Form.Group as={Col} md="4" controlId="fundingGoal">
                <Form.Label>Donation amount</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend2">$</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="text"
                    placeholder="0"
                    aria-describedby="inputGroupPrepend"
                    name="donation"
                    value={values.donation}
                    onChange={(e) => handleAmountChange(e, setFieldValue)}
                    isInvalid={touched.donation && !!errors.donation}
                  />
                  <InputGroup.Append>
                    <InputGroup.Text id="inputGroupPrepend2">
                      .00
                    </InputGroup.Text>
                  </InputGroup.Append>
                  <Form.Control.Feedback type="invalid">
                    {errors.donation}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Button type="submit">Donate</Button>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default Donate
