import React, { useState } from "react"
import { useAuthContext } from "../../context"
import { Button } from "react-bootstrap"
import CampaignList from "../components/CampaignList"
import { Link } from "react-router-dom"
import cards from "../../fakeData"
import MyPagination from "../components/MyPagination"

//home page that displays once user logs in
const Home = () => {
  //use context to check whether user is valid or not
  const authContext = useAuthContext()

  //state for pagination component
  //cards is all the campaigns loaded from the db
  //card page is the set of cards showing on the pagination page
  const [page, setPage] = useState({
    cards: cards,
    card_page: [],
  })

  //update state on pagination page change
  //this function is passed to Pagination component to handle calling that function
  const pageChange = (card_page) => {
    setPage({ ...page, card_page: card_page })
  }

  //render a 'create campain' button for student users
  //render a 'check campaigns that need approval' button for admins
  let button = null
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

  //render a list of campaings, split by pagination if there is enough campaigns
  return (
    <div>
      <pre>{JSON.stringify(authContext.auth, null, 2)}</pre>
      {button}
      <h1 className="text-center">Campaigns</h1>
      <CampaignList cards={page.card_page} />
      <br />
      <MyPagination cards={page.cards} pageChange={pageChange} />
    </div>
  )
}

export default Home
