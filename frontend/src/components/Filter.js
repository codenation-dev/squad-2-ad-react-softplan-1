import React from "react";
import { Form, Col, Button, Card } from "react-bootstrap";

function Filter(props) {

  const getEventosByLevel = (evento) => {
    console.log(evento);
    let level = evento.target.value;
    console.log(level);
    props.getEventosByLevel(level)
  }

  return (
    <Card>
      <Card.Header>Filtro de Logs</Card.Header>
      <Card.Body>
      <Form.Row>
      <Form.Group as={Col} controlId="formGridAmbiente">
          <Form.Label>Level</Form.Label>
          <Form.Control onChange={e => (getEventosByLevel(e))}  as="select">
            <option value="">Choose...</option>
            <option value="Error">Error</option>
            <option value="Warning">Warning</option>
            <option value="Debug">Debug</option>
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridAmbiente">
          <Form.Label>Ambiente</Form.Label>
          <Form.Control  as="select">
            <option>Choose...</option>
            <option>...</option>
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
