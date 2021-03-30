import React from "react"
import { useHistory } from "react-router-dom"
import * as ROUTES from "../../routes/routes"
import { Card, CardDeck, Container, Jumbotron } from "react-bootstrap"
import LandingNavbar from "./LandingNavbar"

const cards = [
  {
    title: "title1",
    text: "text1",
    footer: "footer1",
    image: "/photos/apartment.jpg",
  },
  {
    title: "title2",
    text: "text2",
    footer: "footer2",
    image: "/photos/entrance.jpg",
  },
  {
    title: "title3",
    text: "text3",
    footer: "footer3",
    image: "/photos/front-display.jpg",
  },
]

const Landing = () => {
  const history = useHistory()
  return (
    <div style = {{background: '#d4d7de'}}>
      <LandingNavbar />
      <container> 
        <Jumbotron style = {{background: '#FFD700', color: '#242a36', 
          height: '140px', paddingTop: '20px', textAlign: 'center'}}>
          <h1> Welcome to Flash Fund </h1>
          <p> "Where Flashes help Flashes in a Flash" </p>
        </Jumbotron> 
      </container>
         
        <CardDeck style = 
      {{background: '#242a36', color: '#e3d03b', padding: '15px', flexDirection: 'row'}}>
          {cards.map((card, index) => (
            <Card key={index}>
              <Card.Img variant="top" src={card.image} />
              <Card.Body>
                <Card.Title>{card.title}</Card.Title>
                <Card.Text>{card.text}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">{card.footer}</small>
              </Card.Footer>
            </Card>
          ))}
        </CardDeck>

    <div style= {{paddingTop: '10px'}}>
      <Jumbotron style= {{background: '#252c34', color: '#d5c559', 
          paddingTop : '10px', paddingBottom: '10px', textAlign: 'center'}}>
            <a> <h5>About Us</h5></a>
            <a> <h5>Other</h5></a>
      </Jumbotron>
    </div>  
    </div>
  )
}

export default Landing
/*
        <div>Landing</div>
        <button onClick={() => history.push(ROUTES.LOGIN)}>Login</button>
        <button onClick={() => history.push(ROUTES.REGISTER)}>Register</button>
*/
