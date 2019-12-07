import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

export default class Header extends Component {
  render(){
    return(
      <Container className="mt-3" fluid="true">
        <h2>Bem vindo Usuário. Seu token é: token Icone Usuario</h2>
      </Container>
    );
  }
}