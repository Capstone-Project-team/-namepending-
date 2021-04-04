import React from "react"
import { Redirect, useHistory } from "react-router-dom"
import { Button, Nav, Navbar } from "react-bootstrap"
import "../../assets/css/login.css"
import { logoutUser, useAuthContext } from "../../context"

//nav bar that will be used by user who is logged in
//includes logout button
const UserNavbar = (props) => {
  const authContext = useAuthContext()
  const history = useHistory()
  console.log(authContext)
  const handleLogout = () => {
    logoutUser(authContext.dispatch)
    return <Redirect to="/" />
    //history.push("/")
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
