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
      <Col xs={12} lg={8}>
        <h5> Título </h5>
        <p>{ dataEvent.title }</p>

        <h5> Detalhes </h5>
        <p>{ dataEvent.details }</p>
      </Col>

      <Col xs={12} lg={4}>
        <Alert className={
                        dataEvent.level === "FATAL"
                          ? "p-2 bg-dark text-white"
                          : dataEvent.level === "WARNING"
                          ? "p-2 bg-warning"
                          : dataEvent.level === "INFORMATION"
                          ? "p-2 bg-info"
                          : dataEvent.level === "ERROR"
                          ? "p-2 bg-danger"
                          : "p-2 bg-secondary"
                      }>
          {dataEvent.level}
        </Alert>

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