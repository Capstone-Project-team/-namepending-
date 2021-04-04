import React, { useState, useEffect } from "react"
import { useAuthContext } from "../../context"
import { Button } from "react-bootstrap"
import CampaignList from "../components/CampaignList"
import { Link } from "react-router-dom"
import cards from "../../fakeData"
import MyPagination from "../components/MyPagination"
import axios from "axios"

const baseUrl = "/api/campaigns"
//home page that displays once user logs in
const Home = () => {
  //state for pagination component
  //cards is all the campaigns loaded from the db
  //card page is the set of cards showing on the pagination page

  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(6)
  const pageChange = (pageNumber) => setCurrentPage(pageNumber)
  useEffect(() => {
    const topCampaigns = async () => {
      try {
        //send request to register user
        const response = await axios.get(baseUrl)
        setPosts(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    topCampaigns()
  }, [])

  const indexOfLast = currentPage * postsPerPage
  const indexOfFirst = indexOfLast - postsPerPage
  const currentPosts = posts.slice(indexOfFirst, indexOfLast)
  //use context to check whether user is valid or not
  const authContext = useAuthContext()

  //update state on pagination page change
  //this function is passed to Pagination component to handle calling that function

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
      <CampaignList cards={currentPosts} />
      <br />
      <MyPagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        pageChange={pageChange}
        currentPage={currentPage}
      />
    </div>
  )
}

export default Home
