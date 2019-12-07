import React from 'react';
import { Row, Col, Alert } from 'react-bootstrap';

function DetailItem({ dataEvent }) {

  return(
    <React.Fragment>
    <Row>
      <Col>
        <h2>Erro no { dataEvent.ipOrigin } em { dataEvent.createdAt }</h2>
      </Col>
    </Row>
    <Row>
      <Col xs={12} md={8}>
        <h5> Título </h5>
        <p>{ dataEvent.title }</p>

        <h5> Detalhes </h5>
        <p>{ dataEvent.details }</p>
      </Col>

      <Col xs={6} md={4}>
        <Alert variant="secondary"> error </Alert>

        <h6> Eventos </h6>
        <p> { dataEvent.amount } </p>

        <h6> Coletado por </h6>
        <p> { dataEvent.userToken } </p>
      </Col>
    </Row>
    </React.Fragment>
  );
}

export { DetailItem };