import React, { useState } from "react"
import { Redirect, useHistory } from "react-router-dom"
import { Button, Nav, Navbar } from "react-bootstrap"
import "../../assets/css/login.css"
import { logoutUser, useAuthContext } from "../../context"

//navbar that will be rendered as a header on each page
//a logout button or login/register buttons will be conditionally rendered based on whether a user is logged in
//
const UserNavbar = (props) => {
  const history = useHistory()
  const [loggedout, setLoggedout] = useState(false)
  const authContext = useAuthContext()
  if (loggedout) {
    //history.push("/")
    //return <Redirect push to="/" />
  }
  const handleLogout = () => {
    logoutUser(authContext.dispatch)
    //setLoggedout(true)
    history.push("/")
    //return <Redirect push to="/" />
  }
  return (
    <Navbar
      sticky="top"
      collapseOnSelect
      expand="lg"
      style={{ background: "#242a36" }}
    >
      <Navbar.Brand href="/home" style={{ color: "#e3d03b" }}>
        <img
          src="/logo192.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />
        Flash Fund
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse
        id="responsive-navbar-nav"
        className="justify-content-end"
      >
        {authContext.auth.user.email ? (
          <>
            <Navbar.Text className="mx-4" style={{ color: "#e3d03b" }}>
              User: {authContext.auth.user.email}{" "}
            </Navbar.Text>
            <Nav>
              <Button onClick={handleLogout}>Logout</Button>
            </Nav>
          </>
        ) : (
          <>
            <Nav.Link href="/login" style={{ color: "#e3d03b" }}>
              Login
            </Nav.Link>
            <Nav.Link href="/register" style={{ color: "#e3d03b" }}>
              Register
            </Nav.Link>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  )
}

export default UserNavbar
