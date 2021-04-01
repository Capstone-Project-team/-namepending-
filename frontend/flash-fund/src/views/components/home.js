import React from "react"
import UserNavbar from "./UserNavbar"
import { useAuthContext } from "../../context"
import { Container, Button } from "react-bootstrap"
import CampaignList from "./CampaignList"
import { Link } from "react-router-dom"
import cards from "../../fakeData"

//home page that displays once user logs in
const Home = (...props) => {
  console.log(props)
  const authContext = useAuthContext()
  let button = null

  //render a 'create campain' button for student users
  //render a 'check campaigns that need approval' button for admins
  if (authContext.auth.user.userType === "student") {
    button = (
      <Link to="/new-campaign">
        <Button className="mb-3">Create New Campaign</Button>
      </Link>
    )
  } else if (authContext.auth.user.userType === "admin") {
    button = (
      <Link to="/pending">
        <Button className="mb-3">Pending Requests</Button>
      </Link>
    )
  }

  return (
    <div>
      <UserNavbar />
      <Container className="my-4">
        <pre>{JSON.stringify(authContext.auth, null, 2)}</pre>
        {button}
        <h1 className="text-center">Campaigns</h1>
      </Container>
      <CampaignList cards={cards} />
    </div>
  )
}

export default Home
