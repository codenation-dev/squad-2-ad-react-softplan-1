import React, {useState} from "react";
import {Table, Form, Card, Pagination, Col } from "react-bootstrap";

function List({eventos, pagination, setPagination}) {

  const [itensPerPage, setItensPerPage] = useState();
  const [orderBy, setOrderBy] = useState();


  let items = [];

  const setPage = (page) => {
    setPagination(page, itensPerPage, orderBy);
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

  const SetNumbersPerPage = (e) => {
    const itensPerPageValue = e.target.value
    setItensPerPage(itensPerPageValue)
    setPagination(1, itensPerPageValue, orderBy);
  }

  const setOrder = (e) => {
    const orderByValue = e.target.value
    setOrderBy(orderByValue)
    setPagination(1, itensPerPage, orderByValue);
  }


  return (
    <Card className="mt-3">
      <Card.Header className="text-dark">Lista de Logs</Card.Header>
      <Card.Body>
      <Form.Row style={{ color: "#000"}}>
          <Form.Group as={Col} controlId="formGridAmbiente">
            <Form.Label>Itens per Page</Form.Label>
            <Form.Control onChange={e => (SetNumbersPerPage(e))}  as="select" defaultValue={10}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridAmbiente">
            <Form.Label>Order By:</Form.Label>
            <Form.Control onChange={e => (setOrder(e))} as="select">
              <option value="amount">Events</option>
              <option value="level">Level</option>
              <option value="environment">Environment</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Table striped bordered hover responsive size="sm">
          <thead>
            <tr>
              <th  className="text-center align-middle">
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" />
              </Form.Group>
              </th>
              <th className="text-center align-middle">
                Envorinment
              </th>
              <th className="text-center align-middle">
                level
              </th>
              <th className="text-center align-middle">
                Log
              </th>
              <th className="text-center align-middle">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
          {eventos.map(dt => (
            <React.Fragment key={dt.id}>
              <tr onClick={(event) =>(showCollapse(`line${dt.id}`))}>
                <td className="text-center align-middle">
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" />
                  </Form.Group>
                </td>
                <td className="text-center align-middle">
                  <span>{dt.environment}</span>
                </td>
                <td className="text-center align-middle">
                  <span className={
                      dt.level === "FATAL"? "p-2 bg-dark text-white" : 
                        dt.level === "WARNING" ? "p-2 bg-warning" : 
                          dt.level === "INFORMATION" ? "p-2 bg-info" : 
                            dt.level === "ERROR" ? "p-2 bg-danger" : 
                              "p-2 bg-secondary"
                  }>
                    {dt.level}
                  </span>
                </td>
                <td className="text-center align-middle">
                  <p>{dt.title}</p>
                  <p>{dt.ipOrigin}</p>
                </td>
                <td className="text-center align-middle">
                  {dt.amount}
                </td>
              </tr>
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