import React from "react"
import { Link } from "react-router-dom"
import { Navbar, Nav, NavDropdown } from "react-bootstrap"
import "../../assets/css/login.css"

const LandingNavbar = () => {
  return (
    <Navbar sticky="top" collapseOnSelect expand="lg"
     style = {{background: '#242a36', height: '120px'}}>
      <Navbar.Brand>
        <img src ="/photos/logo.jpg" style ={{ height: '100px'}}/>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav"
        className="justify-content-end"
      >
        <Nav.Link href="/login" style = {{color: '#e3d03b'}}>Login</Nav.Link>
        <Nav.Link href="/register" style = {{color: '#e3d03b'}}>Register</Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default LandingNavbar
