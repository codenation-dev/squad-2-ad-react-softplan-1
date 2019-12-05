import React, { useState } from "react";
import { Form, Col, Button, Card } from "react-bootstrap";

function Filter(props) {
 
  const [environment, setEnvironment] = useState("");
  const [filterKey, setFilterKey] = useState("");
  const [filterValue, setFilterValue] = useState("");

  console.log(props)
  
  const setStateParams = (event, field) => {
    console.log("state")
    console.log("field",field)
    console.log("value",event.target.value)
    if(field === "" && event.target.value){
      setEnvironment(event.target.value)
    }
    if(field !== "" && event.target.value){
      setFilterKey(field)
    }
    if(field != "" && event.target.value){
      setFilterValue(event.target.value)
    }
  }

  const setParams = () => {
    let paramsState = {}
    if(environment){
      paramsState.environment = environment
    }
    if(filterKey){
      paramsState.filterKey = filterKey
    }
    if(filterValue){
      paramsState.filterValue = filterValue
    }
    console.log("State", paramsState);
    console.log("props",props)
    props.setParams(paramsState);
  }

  return (
    <Card>
      <Card.Header>Filtro de Logs</Card.Header>
      <Card.Body>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridAmbiente">
          <Form.Label>Ambiente</Form.Label>
          <Form.Control onChange={e => (setStateParams(e, ""))} onBlur={e => (setParams())}  as="select">
            <option value="">Choose...</option>
            <option value="PRODUCTION">PRODUCTION</option>
            <option value="DEVELOPMENT ">DEVELOPMENT </option>
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridAmbiente">
          <Form.Label>Ordenar por:</Form.Label>
          <Form.Control as="select">
            <option>Choose...</option>
            <option>...</option>
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridAmbiente">
          <Form.Label>Buscar Por</Form.Label>
          <Form.Control type="text"></Form.Control>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridAmbiente">
          <Form.Label>Campo da Busca:</Form.Label>
          <Form.Control  as="select">
            <option>Todos</option>
            <option>...</option>
          </Form.Control>
        </Form.Group>
        
      </Form.Row>

      <Button variant="primary" type="submit">
        Submit
      </Button>
      </Card.Body>
    </Card>
  );
}

export { Filter };
