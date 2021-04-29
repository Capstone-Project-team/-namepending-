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
import { loadStripe } from "@stripe/stripe-js"
import { useAuthContext } from "../../context"

const stripePromise = loadStripe(
  "pk_test_51IhzY5LCSLA6SrKud5O5LM5mUn1zVZTT6rfUKQwpLr6kaSuESX9EwBBD7JjVdneluMQYgHN9D646bMT5r3zxbnZh000lsxPm52"
)

const baseUrl = "/api/campaigns"

//page that accepts donations once the 'donate' button is clicked on a campaign
const Donate = (props) => {
  const { auth } = useAuthContext()
  const handleClick = async (event) => {
    console.log(event)
    // Get Stripe.js instance
    const stripe = await stripePromise

    const donation = parseInt(event.donation) * 100

    // Call your backend to create the Checkout Session
    const response = await axios.post("/api/stripe", {
      email: auth.user.email,
      donation: donation,
      title: card.Title,
    })

    console.log(response)

    const sessionId = response.data.sessionId
    console.log(sessionId)

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: sessionId,
    })

    if (result.error) {
      console.log(result.error)
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  }
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
        <h1>{card.Title}</h1>
        <h5>{`$${card["Donation Collected"]} / $${card["Donation Requested"]}`}</h5>
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
              onSubmit={handleClick}
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
                  <Button className="w-100" role="link" type="submit">
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
