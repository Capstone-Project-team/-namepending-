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
import handleAmountChange from "../../helpers"
import { DonationSchema } from "../../validation_schemas"

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
            boxShadow: "none",
            transform: "none",
          }}
        >
          <Card.Body>
            <Formik
              validationSchema={DonationSchema}
              onSubmit={handleDonation}
              initialValues={{
                donation: "",
              }}
            >
              {({ handleSubmit, values, touched, errors, setFieldValue }) => (
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
