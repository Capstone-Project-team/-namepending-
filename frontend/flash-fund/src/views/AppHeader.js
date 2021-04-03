import React from "react"
import { Container } from "react-bootstrap"
import UserNavbar from "./components/UserNavbar"

const AppHeader = ({ children }) => {
  return (
    <>
      <UserNavbar />
      <Container>{children}</Container>
    </>
  )
}

export default AppHeader
