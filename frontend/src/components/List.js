import React, { useState } from "react";
import {
  Form,
  Card,
  Pagination,
  Row,
  Col,
  Button,
  ButtonToolbar,
  Table,
  Modal
} from "react-bootstrap";
import Detail from "./Detail";
import { shelveEvents, deleteEvents } from "../Api";

function List({ eventos, pagination, setPagination }) {
  const [itensPerPage, setItensPerPage] = useState();
  const [orderBy, setOrderBy] = useState();
  const [selectedRows, setSelectedRows] = useState([]);
  const [show, setShow] = useState(false);
  const [eventIdSelected, setEventIdSelected] = useState(1);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  function handleSelectAll(evt) {      
    if (!evt.target.checked) {
      setSelectedRows([]);      
    } else {        
      let selectedItems = [];
      eventos.map(dt => selectedItems.push(dt.id));
      setSelectedRows(selectedItems);
    }
  }

  function handleSelectRow(evt) {
    let eventId = parseInt(evt.target.value)

    if (!isRowSelected(eventId)) {
      setSelectedRows([...selectedRows, eventId]);
    } else {
      setSelectedRows(selectedRows.filter(it => it !== eventId));
    }
  }

  function isRowSelected(eventId) {
      return (selectedRows.indexOf(eventId) >= 0)
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

  const showInfo = () => {
    const start = pagination.number===0
                    ?1
                    :(pagination.number*pagination.linesPerPage)+1

    const end = pagination.number===0
                ? pagination.linesPerPage 
                : (pagination.number+1)*pagination.linesPerPage < pagination.totalElements
                  ? (pagination.number+1)*pagination.linesPerPage
                  : pagination.totalElements
                  
    return `Showing ${start} to ${end}  of ${pagination.totalElements} records`
  }

  const showCollapse = (event, eventId) => {
    console.log(event.currentTarget);
    if(event.target.type !== "checkbox"){
      setEventIdSelected(eventId)
      handleShow()
    }
  }

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
              {/* Comentado pois com 5 itens na lista a paginação estrapola telas pequenas */}
              {/* <option value="5">5</option> */}
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
                    <Form.Check type="checkbox" onChange={handleSelectAll} />
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
                <tr onClick={(event) =>(showCollapse(event, dt.id))}>
                  <td data-label="Select" className="align-middle">
                    <Form.Group controlId="formBasicCheckbox">                        
                        <Form.Check type="checkbox" value={dt.id} checked={isRowSelected(dt.id)} onChange={handleSelectRow} />
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
        <Row>
          <Col lg={3} className="text-dark" >{showInfo()}</Col>
          <Col className="d-flex justify-content-lg-end">
          <Pagination size="sm">{items}</Pagination>
        </Col>
        </Row>
      </Card.Body>
      <Modal dialogClassName="modal-90w" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: "#000" }}>
          <Detail eventId={eventIdSelected}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
}

export { List };
