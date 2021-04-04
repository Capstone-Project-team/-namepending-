//import { Alert } from "bootstrap"
import axios from "axios"
import React, { useEffect, useState } from "react"
import {
  Container,
  CardDeck,
  Row,
  Card,
  Col,
  Button,
  ButtonGroup,
} from "react-bootstrap"

//component to create a grid of cards to show campaings
//used on landing page and home page
const baseUrl = "/api/pending"
const ApprovalList = (props) => {
  //get campaigns that need approval still 
  useEffect(() => {
    const getPending = async () => {
      const res = await axios.get(baseUrl)
      return res.data
    }
  })

  const [cards, setCards] = useState(props.cards)

  //return a list of cards that allow the admin to click 'approve' or 'deny' on
  return (
    <Container>
      <CardDeck>
        <Row md="3">
          {cards.length === 0 ? (
            <h1>None Pending</h1>
          ) : (
            cards.map((card, index) => (
              <Col key={index}>
                <Card
                  className="mb-3"
                  style={{
                    maxWidth: "50rem",
                    boxShadow: "none",
                    transform: "none",
                  }}
                >
                  <Card.Img variant="top" src={card.image} />
                  <Card.Body>
                    <Card.Title className="text-left">{card.title}</Card.Title>
                    <Card.Text
                      className="overflow-auto"
                      style={{ maxHeight: "8rem" }}
                    >
                      {card.text}
                    </Card.Text>
                  </Card.Body>
                  <Card.Body className="text-center">
                    {cards.find((r) => r.id === card.id).approved ? (
                      <Card.Text>Approved</Card.Text>
                    ) : (
                      <ButtonGroup>
                        <Button
                          variant="link"
                          onClick={() => {
                            //need api call to update campaign to approved
                            setCards(cards.filter((e) => e.id !== card.id))
                          }}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="link"
                          onClick={() => {
                            //need api call to delete campaign
                            setCards(cards.filter((e) => e.id !== card.id))
                          }}
                        >
                          Deny
                        </Button>
                      </ButtonGroup>
                    )}
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">user</small>
                  </Card.Footer>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </CardDeck>
    </Container>
  )
}

export default ApprovalList
