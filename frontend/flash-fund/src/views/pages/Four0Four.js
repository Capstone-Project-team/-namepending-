import React from "react"
import { Link } from "react-router-dom"
import PageNotFound from "./pagenotfound.png"

//page for invalid route
const Four0Four = (...props) => {
  return (
    <div>
      <img
        src={PageNotFound}
        alt="image not found"
        style={{ width: "100%", height: "100%", padding: "100px" }}
      ></img>

      <p style={{ textAlign: "center" }}>
        <Link to="/" style={{ fontSize: 40 }}>
          Go to Home{" "}
        </Link>
      </p>
    </div>
  )
}

export default Four0Four
