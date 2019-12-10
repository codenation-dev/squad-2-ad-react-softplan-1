import React, { Component } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { Button } from 'react-bootstrap';


const Header = () => {

  const token = localStorage.appToken;

  const Logoff = () => {
    localStorage.clear();
  }

  return (
    <Container className="main-header" fluid="true">

      <Row className="row-header">
        <Col >
          <h5>Bem vindo: {localStorage.firstName} </h5>
        </Col>

        <Col xs={6} className="token-user">
          <h5>Token: {localStorage.userToken}</h5>
        </Col>

        <Col className="button-logoff" >
          <Button variant="warning" onClick={Logoff}> <FaUserCircle className="user-icon" /> Logoff</Button>
        </Col>
      </Row>


    </Container >
  )
}

export default Header;


