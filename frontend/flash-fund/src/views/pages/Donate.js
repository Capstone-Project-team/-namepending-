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
import axios from "axios"
import { Redirect } from "react-router"

const baseUrl = "/api/campaigns"

//page that accepts donations once the 'donate' button is clicked on a campaign
const Donate = (props) => {
  const [donationRecieved, setDonationRecieved] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const card = props.location.state
  const handleDonation = async (creds) => {
    creds = {
      ...creds,
      donation: parseInt(creds.donation.replace(/,/g, "")),
    }
    const res = await axios.put(`${baseUrl}/donation/${card.id}`, creds)
    console.log(res)
    setDonationRecieved(true)
    setTimeout(() => {
      setRedirect(true)
    }, 4000)
  }

  if (redirect) {
    return <Redirect push to="/home" />
  }

  //return form for donation input
  return (
    <>
      <div className="text-center">
        <h1>{card.title}</h1>
        <h5>{`$${card.funding_raised} / $${card.funding_goal}`}</h5>
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
            //maxWidth: "30rem",
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
                  <Row className="text-center">
                    <Form.Group as={Col} controlId="fundingGoal">
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
                  <Button className="w-100" type="submit">
                    Donate
                  </Button>
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
