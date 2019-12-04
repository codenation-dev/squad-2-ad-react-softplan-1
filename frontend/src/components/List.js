import React from "react";
import {Table, Form, Card, Pagination } from "react-bootstrap";

function List({eventos}) {
  let active = 2;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>,
    );
  }


  return (
    <Card className="mt-3">
      <Card.Header>Lista de Logs</Card.Header>
      <Card.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" />
              </Form.Group>
              </th>
              <th>
                Level
              </th>
              <th>
                Log
              </th>
              <th>
                Eventos
              </th>
            </tr>
          </thead>
          <tbody>
          {eventos.map(dt => (
            <tr key={dt.id}>
              <td>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" />
                </Form.Group>
              </td>
              <td>
                <span className={dt.environment === "Error"? "bg-danger" : dt.environment === "Warning" ? "bg-warning" : "bg-info"}>{dt.environment}</span>
              </td>
              <td>
                {dt.title}
              </td>
              <td>
                {dt.amount}
              </td>
            </tr>
          ))}
          </tbody>
        </Table>
        <div>
          <Pagination>{items}</Pagination>
        </div>
      </Card.Body>
    </Card>
  );
}

export { List };