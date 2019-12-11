import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { Button, Form } from 'react-bootstrap';
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
    <Container className="main-header" fluid="true">

      <Row className="row-header">
        <Col xs={12} lg={8}>
          <h5>Bem vindo: {localStorage.firstName}.</h5>
          <h5 className="token-user">Seu token é: {localStorage.userToken}.</h5>
        </Col>
  
        <Col xs={6} lg={4} className="button-logoff" >
          <Form>
            <Button type="submit" variant="warning" onClick={Logoff}> <FaUserCircle className="user-icon" /> Logoff</Button>
          </Form>
        </Col>
      </Row>

    </Container >
  )
}

export default Header;


