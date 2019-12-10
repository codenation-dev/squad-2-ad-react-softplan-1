import React, { useState } from "react";
import { Form, Col, Button, Card } from "react-bootstrap";

function Filter(props) {

  const [environment, setEnvironment] = useState("");
  const [filterKey, setFilterKey] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const FilterByEnvironment = (event) => {
    let paramsState = {}

    setEnvironment(event.target.value)
    paramsState.environment = event.target.value
    if (filterKey) {
      paramsState.filterKey = filterKey
    }
    if (filterValue) {
      paramsState.filterValue = filterValue
    }
    props.setParams(paramsState);
  }

  const FilterByField = (event, type) => {
    let paramsState = {}
    if (type === "field" && event.target.value) {
      setFilterKey(event.target.value)
      paramsState.filterKey = event.target.value
      if (filterValue) {
        paramsState.filterValue = filterValue
      }
    }
    if (type === "value" && event.target.value) {
      setFilterValue(event.target.value)
      paramsState.filterValue = event.target.value
      if (filterKey) {
        paramsState.filterKey = filterKey
      }
    }
    if (environment) {
      paramsState.environment = environment
    }
    props.setParams(paramsState);
  }


  return (
    <Card>
      <Card.Body>
        <Form.Row style={{ color: "#000" }}>
          <Form.Group as={Col} controlId="formGridAmbiente">
            <Form.Label>Environment:</Form.Label>
            <Form.Control onChange={e => (FilterByEnvironment(e))} as="select" defaultValue={'PRODUCTION'}>
              {/* {props.list.map((item, idx) => (
                <option key={idx} value={item}>{item}</option>
              ))} */}
              <option value="ALL">ALL</option>
              <option value="APPROVAL">Approval</option>
              <option value="DEVELOPMENT">Development</option>
              <option value="PRODUCTION">Production</option>
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridAmbiente">
            <Form.Label>Field search:</Form.Label>
            <Form.Control onChange={e => (FilterByField(e, "field"))} as="select">
              <option value="NONE">All</option>
              <option value="LEVEL">Level</option>
              <option value="TITLE">Title</option>
              <option value="ORIGIN">Origin</option>
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} onChange={e => (FilterByField(e, "value"))} controlId="formGridAmbiente">
            <Form.Label>Search by:</Form.Label>
            <Form.Control type="text"></Form.Control>
          </Form.Group>


        </Form.Row>
      </Card.Body>
    </Card>
  );
}

export { Filter };
