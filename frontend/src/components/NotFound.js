import React from 'react';
import {
  Container, Row, Col
} from "react-bootstrap";


//Mover para o Pages
const NotFound = () => {
  return (
    <div className="box-login">
      <Container className='text-center mb-3 mt-5'>
        <img src="https://codenation.dev/_nuxt/img/920fd5d.svg" alt="not-found-img" />
        <br/><br/>
        <Row>
          <Col className="mt-4 text-lg">
            <h3>Página não econtrada. Clique <a href="/dashboard">aqui</a> para retornar a página de eventos.</h3>
          </Col>
        </Row>
        
      </Container>
    </div >
  )
}

export default NotFound;