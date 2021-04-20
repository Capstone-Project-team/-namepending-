import React, { useEffect, useState } from "react"
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  ProgressBar,
  Row,
} from "react-bootstrap"
import { Redirect, useHistory } from "react-router"
import cards from "../../fakeData"
import { useAuthContext } from "../../context"
import axios from "axios"

const baseUrl = "/api/campaigns"
//campaign specific page. Will show after you click on a card
const CampaignShow = (props) => {
  //did user click donate or not. if so redirect do donation page
  const [donate, setDonate] = useState(false)

  //set donation card so information can be passed as a prop to the donation page
  const [donationCard, setDonationCard] = useState({})
  const [card, setCard] = useState({})
  const auth = useAuthContext().auth
  const { id } = props.match.params
  useEffect(() => {
    const getCard = async () => {
      const res = await axios.get(`${baseUrl}/${id}`)
      console.log(res.data)
      setCard(res.data)
    }
    getCard()
  }, [])

  const progress = (card.funding_raised / card.funding_goal) * 100
  console.log(progress)

  const timeDiff = (start, end) => {
    const start_time = new Date(start).getTime()
    const end_time = new Date(end).getTime()
    const diff = end_time - start_time
    const diff_days = Math.floor(diff / (1000 * 3600 * 24))
    console.log(diff_days)
    return diff_days
  }

  const posted = timeDiff(card.date_start, new Date())
  const ends = timeDiff(new Date(), card.date_end)

  //only logged in user can donate
  //redirect to homepage, (but should display error message)
  if (donate) {
    //!should be changed to an isAuthenticated method instead of checking for email
    if (auth.user.email) {
      return (
        <Redirect
          push
          to={{
            pathname: `/campaign/${card.id}/donate`,
            state: donationCard,
          }}
        />
      )
    }
    return <Redirect push to={"/login"} />
  }
  //display singular card of campaign that user clicked on
  return (
    <Container className="py-4">
      <Card
        className="text-center m-auto"
        style={{ maxWidth: "50rem", boxShadow: "none", transform: "none" }}
      >
        <Card.Img variant="top" src={card.photo} />
        <Card.Body>
          <Card.Title>{card.title}</Card.Title>
          <Card.Text
            style={{ maxHeight: "8rem" }}
            className="overflow-auto text-left"
          >
            {card.description}
          </Card.Text>
          <Button
            className="w-100"
            variant="primary"
            onClick={() => {
              setDonationCard(card)
              setDonate(true)
            }}
          >
            Donate
          </Button>
        </Card.Body>
        <ListGroup className="list-group-flush text-left">
          <ListGroupItem>user</ListGroupItem>
          <ListGroupItem>
            {`Raised: $${card.funding_raised} / $${card.funding_goal}`}
            <ProgressBar now={progress} />
          </ListGroupItem>
        </ListGroup>
        <Card.Footer className="text-muted text-left">
          <Row>
            <Col>{`Posted: ${posted} days ago`}</Col>
            <Col className="text-right">{`Ends in: ${ends} days`}</Col>
          </Row>
        </Card.Footer>
      </Card>
    </Container>
  )
}

export default CampaignShow
