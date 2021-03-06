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
        <h5> Title </h5>
        <span>{ dataEvent.title }</span>

        <h5> Details </h5>
        <span>{ dataEvent.details }</span>
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

        <h5> Events </h5>
        <span> { dataEvent.amount } </span>

        <h5> Origin </h5>
        <span> { dataEvent.userToken } </span>
      </Col>
    </Row>
    </React.Fragment>
  );
}

export { DetailItem };