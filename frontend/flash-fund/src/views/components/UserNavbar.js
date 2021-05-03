import React from "react"
import { useHistory } from "react-router-dom"
import { Button, Nav, Navbar } from "react-bootstrap"
import "../../assets/css/login.css"
import { logoutUser, useAuthContext } from "../../context"
import axios from "axios"

//navbar that will be rendered as a header on each page
//a logout button or login/register buttons will be conditionally rendered based on whether a user is logged in
//
const UserNavbar = (props) => {
  const history = useHistory()
  const authContext = useAuthContext()
  const handleLogout = async () => {
    try {
      //const res = await axios.post("/api/auth/logout")
      //console.log(res)
      logoutUser(authContext.dispatch)
      history.push("/")
    } catch (error) {
      console.log("error", error)
    }
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
          src="/flash_fund.jpg"
          width="40"
          height="40"
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
