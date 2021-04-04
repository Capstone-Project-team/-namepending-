import React, { useState } from "react"
import { useAuthContext } from "../../context"
import { Button } from "react-bootstrap"
import CampaignList from "../components/CampaignList"
import { Link } from "react-router-dom"
import cards from "../../fakeData"
import MyPagination from "../components/MyPagination"

//home page that displays once user logs in
const Home = (...props) => {
  const authContext = useAuthContext()
  let button = null
  const [page, setPage] = useState({
    cards: cards,
    card_page: [],
  })
  console.log(page)
  const pageChange = (card_page) => {
    console.log("card page", card_page)
    console.log("page change")
    setPage({ ...page, card_page: card_page })
  }

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
      <pre>{JSON.stringify(authContext.auth, null, 2)}</pre>
      {button}
      <h1 className="text-center">Campaigns</h1>
      <CampaignList cards={page.card_page} />
      <MyPagination cards={page.cards} pageChange={pageChange} />
    </div>
  )
}

export default Home
