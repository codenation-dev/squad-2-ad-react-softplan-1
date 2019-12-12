import React, { useState, useEffect } from "react";
import { Form, Col, Card, Accordion } from "react-bootstrap";
import { getEnvironmentList, getFilterKeyList } from "./../Api";

function Filter(props) {
  const [environment, setEnvironment] = useState("");
  const [filterKey, setFilterKey] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const [environmentList, setEnvironmentList] = useState([]);
  const [filterKeyList, setFilterKeyList] = useState([]);

  const FilterByEnvironment = event => {
    let paramsState = {};

    setEnvironment(event.target.value);
    paramsState.environment = event.target.value;
    if (filterKey) {
      paramsState.filterKey = filterKey;
    }
    if (filterValue) {
      paramsState.filterValue = filterValue;
    }
    props.setParams(paramsState);
  };

  const getSearchParams = async () => {
    let asyncFunctions = [getEnvironmentList(), getFilterKeyList()];

    await Promise.all(asyncFunctions).then(([envList, keyList]) => {
      setEnvironmentList(envList);
      setFilterKeyList(keyList);
    });
  };

  useEffect(() => {
    getSearchParams();
  }, []);

  const FilterByField = (event, type) => {
    let paramsState = {};
    if (type === "field" && event.target.value) {
      setFilterKey(event.target.value);
      paramsState.filterKey = event.target.value;
      if (filterValue) {
        paramsState.filterValue = filterValue;
      }
    }
    if (type === "value" && event.target.value) {
      setFilterValue(event.target.value);
      paramsState.filterValue = event.target.value;
      if (filterKey) {
        paramsState.filterKey = filterKey;
      }
    }
    if (environment) {
      paramsState.environment = environment;
    }
    props.setParams(paramsState);
  };

  return (
    <Accordion defaultActiveKey="0">
      <Card>
        <Accordion.Toggle
          as={Card.Header}
          className="text-dark"
          variant="link"
          eventKey="0"
        >
          <span className="btn-link" role="button">Search options</span>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <Form.Row style={{ color: "#000" }}>
              <Form.Group as={Col} xs="12" md="4" controlId="formGridAmbiente">
                <Form.Label>Environment:</Form.Label>
                <Form.Control
                  onChange={e => FilterByEnvironment(e)}
                  as="select"
                  defaultValue={"ALL"}
                >
                  {environmentList.map((item, idx) => (
                    <option key={idx} value={item}>
                      {item}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} xs="12" md="4" controlId="formGridAmbiente">
                <Form.Label>Field search:</Form.Label>
                <Form.Control
                  onChange={e => FilterByField(e, "field")}
                  as="select"
                  defaultValue={"NONE"}
                >
                  {filterKeyList.map((item, idx) => (
                    <option key={idx} value={item}>
                      {item}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group
                as={Col}
                xs="12" md="4"
                onChange={e => FilterByField(e, "value")}
                controlId="formGridAmbiente"
              >
                <Form.Label>Search by:</Form.Label>
                <Form.Control type="text"></Form.Control>
              </Form.Group>
            </Form.Row>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export { Filter };
