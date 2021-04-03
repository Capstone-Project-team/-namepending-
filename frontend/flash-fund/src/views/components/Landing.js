import React, { useEffect, useState } from "react"
import { Redirect, useHistory } from "react-router-dom"
import { Jumbotron, Container } from "react-bootstrap"
import LandingNavbar from "./LandingNavbar"
import CampaignList from "./CampaignList"
import { useAuthContext } from "../../context"

//landing page
import cards from "../../fakeData"
import UserNavbar from "./UserNavbar"
const Landing = () => {
  useEffect(() => {
    const topCampaigns = async () => {}
  })
  const [top, setTop] = useState(cards)
  const authContext = useAuthContext()
  const history = useHistory()
  //redirect already logged in users
  if (authContext.auth.user.email) {
    return <Redirect to="/home" />
  }
  return (
    <div>
      <UserNavbar />
      <Container className="my-4">
        <pre>{JSON.stringify(authContext.auth, null, 2)}</pre>
        <Jumbotron className="text-center">
          <h1>Welcome to Flash Fund</h1>
        </Jumbotron>
        <h1 className="text-center">Top Campaigns</h1>
      </Container>
      <CampaignList cards={top} />
    </div>
  )
}

export default Landing
