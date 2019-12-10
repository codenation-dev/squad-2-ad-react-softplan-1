import React, { useState } from "react";
import {
  Form,
  Card,
  Pagination,
  Col,
  Button,
  ButtonToolbar,
  Table
} from "react-bootstrap";
import { shelveEvents, deleteEvents } from "../Api";

function List({ eventos, pagination, setPagination }) {
  const [itensPerPage, setItensPerPage] = useState();
  const [orderBy, setOrderBy] = useState();
  const [selectedRows, setSelectedRows] = useState([]);

  let items = [];

  const setPage = page => {
    setPagination(page, itensPerPage, orderBy);
  };

  for (let number = 1; number <= pagination.totalPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number - 1 === pagination.number}
        onClick={() => setPage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  const SetNumbersPerPage = e => {
    const itensPerPageValue = e.target.value;
    setItensPerPage(itensPerPageValue);
    setPagination(1, itensPerPageValue, orderBy);
  };

  const setOrder = e => {
    const orderByValue = e.target.value;
    setOrderBy(orderByValue);
    setPagination(1, itensPerPage, orderByValue);
  };

  function columnClassNameFormat(fieldValue, row, rowIdx, colIdx) {
    let styleName = "p-2 bg-secondary";

    if (fieldValue === "FATAL") {
      styleName = "p-2 bg-dark text-white";
    }

    if (fieldValue === "WARNING") {
      styleName = "p-2 bg-warning";
    }

    if (fieldValue === "INFORMATION") {
      styleName = "p-2 bg-info";
    }

    if (fieldValue === "ERROR") {
      styleName = "p-2 bg-danger";
    }

    return styleName;
  }

  function onRowSelect({ id }, isSelected) {
    if (isSelected) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter(it => it !== id));
    }
  }

  function onSelectAll(isSelected) {
    if (!isSelected) {
      setSelectedRows([]);
    } else {
      let selectedItems = [];
      eventos.map(dt => selectedItems.push(dt.id));
      setSelectedRows(selectedItems);
    }
  }

  const handleShelveClick = async () => {
    await shelveEvents(selectedRows);
    setPagination(1, itensPerPage, orderBy);
    setSelectedRows([]);
  };

  const handleDeleteClick = async () => {
    await deleteEvents(selectedRows);
    setPagination(1, itensPerPage, orderBy);
    setSelectedRows([]);
  };

  const selectRowProp = {
    mode: "checkbox",
    clickToSelect: true,
    onSelect: onRowSelect,
    onSelectAll: onSelectAll,
    selected: selectedRows
  };

  return (
    <Card className="mt-3">
      <Card.Body>
        <Form.Row style={{ color: "#000" }}>
          <Form.Group as={Col} controlId="formGridAmbiente">
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
          <Form.Group as={Col} controlId="formGridAmbiente">
            <Form.Label>Order By:</Form.Label>
            <Form.Control onChange={e => setOrder(e)} as="select">
              <option value="amount">Events</option>
              <option value="level">Level</option>
              <option value="environment">Environment</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <ButtonToolbar>
              <Button variant="secondary" onClick={handleShelveClick}>
                Shelve items
              </Button>
              <Button variant="danger" onClick={handleDeleteClick}>
                Delete items
              </Button>
            </ButtonToolbar>
          </Form.Group>
        </Form.Row>

        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th className="text-center align-middle">
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" />
                </Form.Group>
              </th>
              <th className="text-center align-middle">Envorinment</th>
              <th className="text-center align-middle">level</th>
              <th className="text-center align-middle">Log</th>
              <th className="text-center align-middle">Amount</th>
            </tr>
          </thead>
          <tbody>
            {eventos.map(dt => (
              <React.Fragment key={dt.id}>
                <tr>
                  <td data-label="Select" className="align-middle">
                    <Form.Group controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" />
                    </Form.Group>
                  </td>
                  <td data-label="Envorinment" className="align-middle">
                    <span>{dt.environment}</span>
                  </td>
                  <td data-label="Level" className="align-middle">
                    <span
                      className={
                        dt.level === "FATAL"
                          ? "p-2 bg-dark text-white"
                          : dt.level === "WARNING"
                          ? "p-2 bg-warning"
                          : dt.level === "INFORMATION"
                          ? "p-2 bg-info"
                          : dt.level === "ERROR"
                          ? "p-2 bg-danger"
                          : "p-2 bg-secondary"
                      }
                    >
                      {dt.level}
                    </span>
                  </td>
                  <td data-label="Log" className="align-middle">
                    <p>{dt.title}</p>
                    <p>{dt.ipOrigin}</p>
                  </td>
                  <td data-label="Amount" className="align-middle">{dt.amount}</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </Table>
        <Col className="text-dark lg-6" >Showing 1 of 30 records</Col>
        <Col>
          <Pagination>{items}</Pagination>
        </Col>
      </Card.Body>
    </Card>
  );
}

export { List };
