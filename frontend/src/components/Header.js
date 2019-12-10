import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { FaUserAlt } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'

const Header = () => {
  const token = localStorage.appToken;
  const Logoff = () => {
    localStorage.clear();
  }
  return (
    <Container className="main-header" fluid="true">
      <div className="title">
        <h4>Bem vindo: Fernando </h4>
      </div>

      <div className="Btn-Logoff">
        <Button variant="warning" onClick={Logoff}>Logoff</Button>
      </div>
      <div className="icon-user">
        <FaUserAlt />
      </div>
    </Container>
  )
}

export default Header;


