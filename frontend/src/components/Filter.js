import React, { useState } from "react";
import { Form, Col, Button, Card } from "react-bootstrap";

function Filter(props) {
 
  const [environment, setEnvironment] = useState("");
  const [filterKey, setFilterKey] = useState("");
  const [filterValue, setFilterValue] = useState("");

  console.log(props)
  
  const FilterByEnvironment = (event) => {
    let paramsState = {}
    
    setEnvironment(event.target.value)
    paramsState.environment = event.target.value
    if(filterKey){
      paramsState.filterKey = filterKey
    }
    if(filterValue){
      paramsState.filterValue = filterValue
    }
    props.setParams(paramsState);
  }

  const FilterByField = (event, type) => {
    let paramsState = {}
    console.log("entrou");
    if(type === "field" && event.target.value){
      console.log("entrou field");
      setFilterKey(event.target.value)
      paramsState.filterKey = event.target.value
      if(filterValue){
        paramsState.filterValue = filterValue
      }
    }
    if(type === "value" && event.target.value){
       console.log("entrou value");
       setFilterValue(event.target.value)
       paramsState.filterValue = event.target.value
       if(filterKey){
        paramsState.filterKey = filterKey
      }
    }
    if(environment){
      paramsState.environment = environment
    }
    console.log(paramsState);
    props.setParams(paramsState);
  }

  return (
    <Card>
      <Card.Header>Filtro de Logs</Card.Header>
      <Card.Body>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridAmbiente">
          <Form.Label>Ambiente</Form.Label>
          <Form.Control onChange={e => (FilterByEnvironment(e))}  as="select" defaultValue={'PRODUCTION'}>
            <option value="ALL">ALL</option>
            <option value="APPROVAL">APPROVAL</option>
            <option value="DEVELOPMENT">DEVELOPMENT </option>
            <option value="PRODUCTION">PRODUCTION</option>
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridAmbiente">
          <Form.Label>Campo da Busca:</Form.Label>
          <Form.Control onChange={e => (FilterByField(e, "field"))} as="select">
            <option value="">Todos</option>
            <option value="TITLE">Title</option>
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col}  onChange={e => (FilterByField(e, "value"))} controlId="formGridAmbiente">
          <Form.Label>Buscar Por</Form.Label>
          <Form.Control type="text"></Form.Control>
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
