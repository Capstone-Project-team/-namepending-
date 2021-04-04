import React, { useState } from "react"
import { Container, CardDeck, Row, Card, Col } from "react-bootstrap"

const fakeText =
  "Ambitioni dedisse scripsisse iudicaretur. Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus. Praeterea iter est quasdam res quas ex communi. At nos hinc posthac, sitientis piros Afros. Petierunt uti sibi concilium totius Galliae in diem certam indicere. Cras mattis iudicium purus sit amet fermentum"

//component to create a grid of cards to show campaings
//used on landing page and home page
const CampaignList = (props) => {
  return (
    <Container>
      <CardDeck
        className="p-4"
        style={{
          background: "#242a36",
          color: "#e3d03b",
        }}
      >
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
                  <Card.Text
                    className="overflow-hidden"
                    style={{ maxHeight: "4rem" }}
                  >
                    {fakeText}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">raised $900 / $1000</small>
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
