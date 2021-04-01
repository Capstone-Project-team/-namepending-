import React from "react"
import { Container, CardDeck, Row, Card, Col } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"

//component to create a grid of cards to show campaings
//used on landing page and home page
const CampaignList = (props) => {
  return (
    <Container>
      <CardDeck>
        <Row md="3">
          {props.cards.map((card, index) => (
            <Col key={index}>
              <Card
                className="mb-3"
                onClick={(event) =>
                  //redired to campaign specific page. should be done using react-router useHistory, but can't get it to work correctly
                  (window.location.href = `/campaign/${card.id}`)
                }
              >
                <Card.Img variant="top" src={card.image} />
                <Card.Body>
                  <Card.Title className="text-center">{card.title}</Card.Title>
                  <Card.Text>{card.text}</Card.Text>
                </Card.Body>
                {props.pending && (
                  <Card.Body className="text-center">
                    <Card.Link>Approve</Card.Link>
                    <Card.Link>Deny</Card.Link>
                  </Card.Body>
                )}
                <Card.Footer>
                  <small className="text-muted">{card.footer}</small>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </CardDeck>
    </Container>
  )
}

export default CampaignList
