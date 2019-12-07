import React from "react";
import {Table, Form, Card, Pagination } from "react-bootstrap";

function List({eventos, pagination, setPagination}) {
  let active = 2;
  let items = [];
  console.log(pagination)

  const setPage = (page) => {
    setPagination(page);
  }

  for (let number = 1; number <= pagination.totalPages; number++) {
    items.push(
      <Pagination.Item key={number} active={(number-1) === pagination.number} onClick={() => setPage(number)}> 
        {number}
      </Pagination.Item>,
    );
  }

  const showCollapse = (elementClass) => {
    const element = document.getElementById(elementClass);
    element.classList.toggle("d-none");
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
                Envorinment
              </th>
              <th>
                Title
              </th>
              <th>
                level
              </th>
              <th>
                Details
              </th>
              <th>
                Origin
              </th>
              <th>
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
          {eventos.map(dt => (
            <React.Fragment key={dt.id}>
            <tr onClick={(event) =>(showCollapse(`line${dt.id}`))}>
              <td>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" />
                </Form.Group>
              </td>
              <td className={dt.environment === "PRODUCTION"? "bg-danger" : dt.environment === "DEVELOPMENT" ? "bg-warning" : "bg-info"}>
                <span>{dt.environment}</span>
              </td>
              <td>
                {dt.title}
              </td>
              <td>
                {dt.level}
              </td>
              <td>
                {dt.details}
              </td>
              <td>
                {dt.origin}
              </td>
              <td>
                {dt.amount}
              </td>
            </tr>
            <tr><td colSpan="7" className="d-none"></td></tr>
            <tr><td colSpan="7" className="d-none" id={`line${dt.id}`}>Result</td></tr>
            </React.Fragment>
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