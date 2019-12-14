import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Button, Form, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { history } from '../history'

const Header = () => {

  const redirect = () => {
    history.push("/")
  }

  const Logoff = () => {
    localStorage.clear();
    redirect();
    return true
  }

  return (
    <>
      <Navbar id="nav-desktop" expand="lg" className="mb-3">
        <Navbar.Brand href="#home"><img
          src="/lognation.png"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          </Nav>
          <NavDropdown title={<div className="float-left"><FaUserCircle style={{ width: "45px", height: "45px", color: "#fff" }} className="user-icon" /></div>} id="collasible-nav-dropdown">
            <div><b>Bem vindo</b>: {localStorage.firstName}</div>
            <div><b>Seu token</b> :  <small>{localStorage.userToken}</small></div>
            <Form inline className="float-right">
              <Button type="submit" variant="warning" onClick={Logoff}> <FaUserCircle className="user-icon" /> Logoff</Button>
            </Form>
          </NavDropdown>

        </Navbar.Collapse>
      </Navbar>

      <Navbar id="nav-mobile" expand="lg" className="mb-3">
        <Navbar.Brand href="#home"><img
          src="/lognation.png"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="p-3" style={{ backgroundColor: "#fff", color: "#000" }}>
          <Nav className="mr-auto">
          </Nav>
          <div><b>Bem vindo</b>: {localStorage.firstName}</div>
          <div><b>Seu token</b> :  <small>{localStorage.userToken}</small></div>
          <Form inline className="float-right">
            <Button type="submit" variant="warning" onClick={Logoff}> <FaUserCircle className="user-icon" /> Logoff</Button>
          </Form>

        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default Header;


