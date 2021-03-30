import React, { useContext } from "react"
import UserNavbar from "./UserNavbar"
import { loginUser, useAuthContext } from "../../context"

const Home = (...props) => {
  const authContext = useAuthContext()

  return (
    <div>
      <UserNavbar />
      <pre>{JSON.stringify(authContext.auth, null, 2)}</pre>
    </div>
  )
}

export default Home
