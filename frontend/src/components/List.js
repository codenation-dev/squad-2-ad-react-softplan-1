import React, { useState } from "react";
import { Form, Card, Pagination, Col, Button, ButtonToolbar } from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { shelveEvents, deleteEvents } from "../Api";

function List({ eventos, pagination, setPagination }) {

  const [itensPerPage, setItensPerPage] = useState();
  const [orderBy, setOrderBy] = useState();
  const [selectedRows, setSelectedRows] = useState([]);

  let items = [];

  const setPage = (page) => {
    setPagination(page, itensPerPage, orderBy);
  }

  for (let number = 1; number <= pagination.totalPages; number++) {
    items.push(
      <Pagination.Item key={number} active={(number - 1) === pagination.number} onClick={() => setPage(number)}>
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

  function columnClassNameFormat(fieldValue, row, rowIdx, colIdx) {

    let styleName = "p-2 bg-secondary"

    if (fieldValue === "FATAL") {
      styleName = "p-2 bg-dark text-white"
    }

    if (fieldValue === "WARNING") {
      styleName = "p-2 bg-warning"
    }

    if (fieldValue === "INFORMATION") {
      styleName = "p-2 bg-info"
    }

    if (fieldValue === "ERROR") {
      styleName = "p-2 bg-danger"
    }

    return styleName
  }

  function onRowSelect({ id }, isSelected) {
    if (isSelected) {
      setSelectedRows([...selectedRows, id])
    } else {
      setSelectedRows(selectedRows.filter(it => it !== id))
    }
  }

  function onSelectAll(isSelected) {
    if (!isSelected) {
      setSelectedRows([]);
    } else {
      let selectedItems = [];
      eventos.map(dt => (
        selectedItems.push(dt.id)
      ));
      setSelectedRows(selectedItems)
    }
  }

  const handleShelveClick = async () => {
    await shelveEvents(selectedRows);
    setPagination(1, itensPerPage, orderBy);
    setSelectedRows([]);
  }

  const handleDeleteClick = async () => {
    await deleteEvents(selectedRows);
    setPagination(1, itensPerPage, orderBy);
    setSelectedRows([]);
  }

  const selectRowProp = {
    mode: 'checkbox',
    clickToSelect: true,
    onSelect: onRowSelect,
    onSelectAll: onSelectAll,
    selected: selectedRows
  };

  return (
    <Card className="mt-3">
      <Card.Header className="text-dark">Lista de Logs</Card.Header>
      <Card.Body>
        <Form.Row style={{ color: "#000" }}>
          <Form.Group as={Col} controlId="formGridAmbiente">
            <Form.Label>Itens per Page</Form.Label>
            <Form.Control onChange={e => (SetNumbersPerPage(e))} as="select" defaultValue={10}>
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
        <Form.Row>
          <Form.Group as={Col}>
            <ButtonToolbar>
              <Button variant="secondary" onClick={handleShelveClick}>Shelve items</Button>
              <Button variant="danger" onClick={handleDeleteClick}>Delete items</Button>
            </ButtonToolbar>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <BootstrapTable
              striped
              hover
              data={eventos}
              selectRow={selectRowProp}
              options={{ noDataText: 'No events found.' }}>
              <TableHeaderColumn width='100' isKey hidden dataField='id'>Id</TableHeaderColumn>
              <TableHeaderColumn width='100' hidden dataField='shelved'>Shelved</TableHeaderColumn>
              <TableHeaderColumn width='150' dataField='environment'>Environment</TableHeaderColumn>
              <TableHeaderColumn width='150' dataField='level' columnClassName={columnClassNameFormat}>Level</TableHeaderColumn>
              <TableHeaderColumn dataField='title'>Title</TableHeaderColumn>
              <TableHeaderColumn width='100' dataField='amount'>Amount</TableHeaderColumn>
            </BootstrapTable>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <Pagination>{items}</Pagination>
          </Form.Group>
        </Form.Row>
      </Card.Body>
    </Card>
  );
}

export { List };