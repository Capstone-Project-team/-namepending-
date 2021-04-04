import React, { useState } from "react"
import {
  Card,
  Form,
  InputGroup,
  Button,
  Row,
  Col,
  Alert,
} from "react-bootstrap"
import { Formik } from "formik"
import * as yup from "yup"
import handleAmountChange from "../../helpers"

//schema used by yup to validate the form inputs
const schema = yup.object().shape({
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

//page that accepts donations once the 'donate' button is clicked on a campaign
const Donate = (props) => {
  const [donationRecieved, setDonationRecieved] = useState(false)
  const card = props.location.state
  const handleDonation = (creds) => {
    setDonationRecieved(true)
  }

  //return form for donation input
  return (
    <>
      <div className="text-center">
        <h1>{card.title}</h1>
        <h5>$900 / $1000</h5>
      </div>
      {donationRecieved ? (
        <Alert variant="success" className="text-center">
          <h1>Payment Made</h1>
        </Alert>
      ) : (
        <Card
          style={{
            //maxWidth: "50rem",
            boxShadow: "none",
            transform: "none",
          }}
        >
          <Card.Body>
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
                  <Row>
                    <Form.Group as={Col} md="4" controlId="fundingGoal">
                      <Form.Label>Donation amount</Form.Label>
                      <InputGroup hasValidation>
                        <InputGroup.Prepend>
                          <InputGroup.Text id="inputGroupPrepend2">
                            $
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                          type="text"
                          placeholder="0"
                          aria-describedby="inputGroupPrepend"
                          name="donation"
                          value={values.donation}
                          onChange={(e) => {
                            const val = handleAmountChange(e)
                            if (val !== undefined)
                              setFieldValue("donation", val)
                          }}
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
          </Card.Body>
        </Card>
      )}
    </>
  )
}

export default Donate
