import React, { useState } from "react"
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap"
import { Redirect, useHistory } from "react-router"
import cards from "../../fakeData"
import { useAuthContext } from "../../context"

const fakeText =
  "This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action."

//campaign specific page. Will show after you click on a card
const CampaignShow = (props) => {
  const [donate, setDonate] = useState(false)
  const [donationCard, setDonationCard] = useState({})
  const auth = useAuthContext().auth
  const history = useHistory()
  const { id } = props.match.params
  const card = cards.find((card) => card.id === Number(id))
  //only logged in user can donate
  //redirect to homepage, but should display error message
  if (donate) {
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
    //history.push(`/campaign/${card.id}/donate`)
  }
  return (
    <Container className="py-4">
      <Card
        className="text-center m-auto"
        style={{ maxWidth: "50rem", boxShadow: "none", transform: "none" }}
      >
        <Card.Img variant="top" src={card.image} />
        <Card.Body>
          <Card.Title>{card.title}</Card.Title>
          <Card.Text
            style={{ maxHeight: "8rem" }}
            className="overflow-auto text-left"
          >
            {fakeText}
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
        </ListGroup>
        <Card.Footer className="text-muted text-left">
          <Row>
            <Col>Posted: 8 days ago</Col>
            <Col className="text-right">Ends in: 6 days</Col>
          </Row>
        </Card.Footer>
      </Card>
    </Container>
  )
}

export default CampaignShow
