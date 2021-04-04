import React, { useEffect, useState } from "react"
import { Redirect, useHistory } from "react-router-dom"
import { Jumbotron } from "react-bootstrap"
import CampaignList from "../components/CampaignList"
import { useAuthContext } from "../../context"

//landing page
import cards from "../../fakeData"
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
    <div
      style={
        {
          /*background: "#d4d7de" */
        }
      }
    >
      <pre>{JSON.stringify(authContext.auth, null, 2)}</pre>
      <Jumbotron
        style={{
          background: "#FFD700",
          color: "#242a36",
          height: "140px",
          paddingTop: "20px",
          textAlign: "center",
        }}
        className="text-center"
      >
        <h1>Welcome to Flash Fund</h1>
      </Jumbotron>
      <h1 className="text-center">Top Campaigns</h1>
      <CampaignList cards={top} />
    </div>
  )
}

export default Landing
