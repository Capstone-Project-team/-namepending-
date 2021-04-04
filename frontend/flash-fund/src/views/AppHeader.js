import React from "react"
import { Container } from "react-bootstrap"
import UserNavbar from "./components/UserNavbar"

//A wrapper around all the pages that adds a header at the top of the page
//soon to be a footer
//and additionally wraps a Container Component from bootstrap around the page elements
const AppHeader = ({ children }) => {
  return (
    <>
      <UserNavbar />
      <Container className="my-5">{children}</Container>
    </>
  )
}

export default AppHeader
