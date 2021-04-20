// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

const express = require("express")
const app = express()
const stripe = require("stripe")(
  "sk_test_51IhzY5LCSLA6SrKuQJKgpKUIxJwHglUrlTe938gCn3nhsixQUrpVxjzmE5c9QGxY8qiBnAyMo1dqFfLMzqBPHIEe00z8eq3yVm"
)

//localhost port that react is running on
const url = "http://localhost:5001"

//fix cors errors
let allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
}
app.use(allowCrossDomain)

//route that is called when 'donate' button is pressed
//session id is returned and use by client to redirect to stripe checkout page on their domain
app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    customer_email: "customer@example.com",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Donation",
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${url}/`,
    cancel_url: `${url}/`,
  })

  res.json({ id: session.id })
})

app.listen(4242, () => console.log(`Listening on port ${4242}!`))
