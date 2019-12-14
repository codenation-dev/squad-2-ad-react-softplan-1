import React, { useState, useEffect } from "react";
import { Form, Col, Card, Accordion } from "react-bootstrap";
import { getEnvironmentList, getFilterKeyList } from "./../Api";

function CustomView({ pagination, setPagination }) {

  const SetNumbersPerPage = e => {
    const itensPerPageValue = e.target.value;
    setPagination(1, itensPerPageValue, pagination.orderByField);
  };

  const setOrder = e => {
    const orderByValue = e.target.value;
    setPagination(1, pagination.linesPerPage, orderByValue);
  };


  return(
    <>
      <Form.Row style={{ color: "#000" }}>
        <Form.Group as={Col} xs="12" md="6" controlId="formGridAmbiente">
          <Form.Label>Itens per Page</Form.Label>
          <Form.Control
            onChange={e => SetNumbersPerPage(e)}
            as="select"
            defaultValue={10}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col} xs="12" md="6" controlId="formGridAmbiente">
          <Form.Label>Order By:</Form.Label>
          <Form.Control onChange={e => setOrder(e)} as="select">
            <option value="amount">Events</option>
            <option value="level">Level</option>
            <option value="environment">Environment</option>
          </Form.Control>
        </Form.Group>
      </Form.Row>
    </>
        
  )

}
export { CustomView }