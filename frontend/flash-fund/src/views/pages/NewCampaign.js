import React, { useState } from "react"

import { Spinner, Form, InputGroup, Button, Card } from "react-bootstrap"
import { Formik } from "formik"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import axios from "axios"
import handleAmountChange from "../../helpers"
import { NewCampaignSchema } from "../../validation_schemas"

const baseUrl = "/api/campaign"

const NewCampaign = () => {
  const [state, setState] = useState(false)

  //submit new data to db to store the campaign
  const handleCampaign = (creds, { setSubmitting, resetForm }) => {
    setState(true)
    const submit = async () => {
      try {
        //send request to route to post campaign
        const response = await axios.post(baseUrl, creds, {
          "access-control-allow-origin": "*",
          "content-type": "application/json",
        })
        const data = response.status
        console.log(data)
        setSubmitting(false)
        resetForm()
      } catch (error) {
        setSubmitting(false)
      }
    }
    submit()
  }

  //return form for new campaign posting
  return (
    <Card
      style={{
        //maxWidth: "50rem",
        boxShadow: "none",
        transform: "none",
      }}
    >
      <Card.Body>
        <Formik
          validationSchema={NewCampaignSchema}
          onSubmit={handleCampaign}
          initialValues={{
            date_End: "",
            name: "",
            funding_Goal: "",
            fundraiser_description: "",
          }}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            touched,
            errors,
            setFieldValue,
            isSubmitting,
            resetForm,
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
                    onChange={(e) => {
                      const val = handleAmountChange(e)
                      if (val !== undefined) setFieldValue("funding_Goal", val)
                    }}
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
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Spinner as="span" animation="border" />
                ) : (
                  "Create Campaign"
                )}
              </Button>
              {state && <pre>{JSON.stringify(values, null, 2)}</pre>}
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  )
}

export default NewCampaign
