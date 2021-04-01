import React from "react"
import { Redirect, useHistory } from "react-router-dom"
import * as ROUTES from "../../routes/routes"
import { Card, CardDeck, Col, Container, Jumbotron, Row } from "react-bootstrap"
import LandingNavbar from "./LandingNavbar"
import CampaignList from "./CampaignList"
import { useAuthContext } from "../../context"

//landing page
import cards from "../../fakeData"
const Landing = () => {
  const authContext = useAuthContext()
  const history = useHistory()
  //redirect already logged in users
  if (authContext.auth.user.email) {
    return <Redirect to="/home" />
  }
  return (
    <div>
      <LandingNavbar />
      <Container className="my-4">
        <pre>{JSON.stringify(authContext.auth, null, 2)}</pre>
        <Jumbotron className="text-center">
          <h1>Welcome to Flash Fund</h1>
        </Jumbotron>
        <h1 className="text-center">Top Campaigns</h1>
      </Container>
      <CampaignList cards={cards} />
    </div>
  )
}

export default Landing
/*
        <div>Landing</div>
        <button onClick={() => history.push(ROUTES.LOGIN)}>Login</button>
        <button onClick={() => history.push(ROUTES.REGISTER)}>Register</button>
*/
