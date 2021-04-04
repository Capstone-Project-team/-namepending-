import React from "react"
import { Container } from "react-bootstrap"
import UserNavbar from "./components/UserNavbar"

const AppHeader = ({ children }) => {
  return (
    <>
      <UserNavbar />
      <Container className="my-5">{children}</Container>
    </>
  )
}

export default AppHeader
