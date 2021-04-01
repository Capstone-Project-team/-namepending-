import React from "react"
import { Link, useHistory } from "react-router-dom"
import { Button, Nav, Navbar } from "react-bootstrap"
import "../../assets/css/login.css"
import { logoutUser, useAuthContext } from "../../context"

const user = "Ian"

//nav bar that will be used by user who is logged in
//includes logout button
const UserNavbar = () => {
  const authContext = useAuthContext()
  const history = useHistory()
  console.log(authContext)
  const handleLogout = () => {
    logoutUser(authContext.dispatch)
    history.push("/")
  }
  return (
    <Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/home">Flash Fund</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse
        id="responsive-navbar-nav"
        className="justify-content-end"
      >
        <Navbar.Text>User: {authContext.auth.user.email} </Navbar.Text>
        <Nav navbar>
          <Button onClick={handleLogout}>Logout</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default UserNavbar
