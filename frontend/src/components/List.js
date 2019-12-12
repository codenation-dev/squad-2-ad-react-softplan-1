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

  const [showUnselectedRows, setShowUnselectedRows] = useState(false);
  const handleCloseUnselectedRows = () => setShowUnselectedRows(false);
  const handleShowUnselectedRows = () => setShowUnselectedRows(true);

  const [showDialogShelve, setShowDialogShelve] = useState(false);
  const handleDialogShelveClose = () => setShowDialogShelve(false);
  const handleDialogShelveShow = () => {
    if (selectedRows.length > 0) {
      setShowDialogShelve(true);
    } else {
      handleShowUnselectedRows();
    }
  };
  const handleDialogShelveAccept = () => {
    handleShelveClick();
    setShowDialogShelve(false);
  };

  const [showDialogDelete, setShowDialogDelete] = useState(false);
  const handleDialogDeleteClose = () => setShowDialogDelete(false);
  const handleDialogDeleteShow = () => {
    if (selectedRows.length > 0) {
      setShowDialogDelete(true);
    } else {
      handleShowUnselectedRows();
    }
  };
  const handleDialogDeleteAccept = () => {
    handleDeleteClick();
    setShowDialogDelete(false);
  };

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

  function handleSelectAllByButton(evt) {
    document.getElementById("selectAll").click();
  }

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
    let eventId = parseInt(evt.target.value);

    if (!isRowSelected(eventId)) {
      setSelectedRows([...selectedRows, eventId]);
    } else {
      setSelectedRows(selectedRows.filter(it => it !== eventId));
    }
  }

  function isRowSelected(eventId) {
    return selectedRows.indexOf(eventId) >= 0;
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
    const start =
      pagination.number === 0
        ? 1
        : pagination.number * pagination.linesPerPage + 1;

    const end =
      pagination.number === 0
        ? pagination.linesPerPage
        : (pagination.number + 1) * pagination.linesPerPage <
          pagination.totalElements
        ? (pagination.number + 1) * pagination.linesPerPage
        : pagination.totalElements;

    return `Showing ${start} to ${end}  of ${pagination.totalElements} records`;
  };

  const showCollapse = (event, eventId) => {
    //console.log(event.currentTarget);
    if (event.target.type !== "checkbox") {
      setEventIdSelected(eventId);
      handleShow();
    }
  };

  return (
    <Card className="mt-3">
      <Card.Body>
        <Form.Row style={{ color: "#000" }}>
          <Form.Group as={Col} xs="12" md="6" controlId="formGridAmbiente">
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
          <Form.Group as={Col} xs="12" md="6" controlId="formGridAmbiente">
            <Form.Label>Order By:</Form.Label>
            <Form.Control onChange={e => setOrder(e)} as="select">
              <option value="amount">Events</option>
              <option value="level">Level</option>
              <option value="environment">Environment</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} xs="12">
            <ButtonToolbar>
              <Button variant="secondary" className="button-tolbar mr-2 mb-2" onClick={handleDialogShelveShow}>
                Shelve items
              </Button>
              <Button variant="danger" className="button-tolbar mr-2 mb-2" onClick={handleDialogDeleteShow}>
                Delete items
              </Button>
              <Button id="btn-select-all" className="button-tolbar mr-2 mb-2" variant="primary" onClick={handleSelectAllByButton}>
                Select All
              </Button>
            </ButtonToolbar>
          </Form.Group>
        </Form.Row>

        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th className="text-center align-middle" style={{ width: "50px", height: "50px" }}>
                <Form.Group controlId="formBasicCheckbox" className="pl-3" >
                  <Form.Check.Input id="selectAll" className="big-checkbox" type="checkbox" onChange={handleSelectAll} />
                </Form.Group>
              </th>
              <th className="text-center align-middle" style={{ width: "160px" }}>Environment</th>
              <th className="text-center align-middle" style={{ width: "120px" }}>Level</th>
              <th className="text-center align-middle">Log</th>
              <th className="text-center align-middle" style={{ width: "120px" }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {eventos.map(dt => (
              <React.Fragment key={dt.id}>
                <tr onClick={event => showCollapse(event, dt.id)}>
                  <td data-label="Select" className="align-middle" style={{ height: "40px" }}>
                    <Form.Group controlId="formBasicCheckbox" className="pl-3">
                      <Form.Check.Input
                        type="checkbox"
                        className="big-checkbox"
                        value={dt.id}
                        checked={isRowSelected(dt.id)}
                        onChange={handleSelectRow}
                      />
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
                    <span>{dt.title}</span><br/>
                    <span>{dt.ipOrigin}</span>
                  </td>
                  <td data-label="Amount" className="align-middle">
                    {dt.amount}
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </Table>
        <Row>
          <Col lg={3} className="text-dark">
            {showInfo()}
          </Col>
          <Col className="d-flex justify-content-lg-end">
            <Pagination size="sm">{items}</Pagination>
          </Col>
        </Row>
      </Card.Body>

      <Modal show={showUnselectedRows} onHide={handleCloseUnselectedRows}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#000" }}>
            No events selected
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: "#000" }}>
          To continue, select an event.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseUnselectedRows}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDialogShelve} onHide={handleDialogShelveClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#000" }}>Shelve items</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: "#000" }}>
          Do you really want to shelve the selected events?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDialogShelveClose}>
            No
          </Button>
          <Button variant="primary" onClick={handleDialogShelveAccept}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDialogDelete} onHide={handleDialogDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#000" }}>Delete items</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: "#000" }}>
          Do you really want to delete the selected events?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDialogDeleteClose}>
            No
          </Button>
          <Button variant="primary" onClick={handleDialogDeleteAccept}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal dialogClassName="modal-90w" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: "#000" }}>
          <Detail eventId={eventIdSelected} />
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
