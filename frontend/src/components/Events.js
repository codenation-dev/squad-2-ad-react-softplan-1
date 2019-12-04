import React from "react";
import { Filter } from "./Filter";
import { List } from "./List";
import { Container } from 'react-bootstrap';
import { getEventos, getEventosByLevel } from "../Api";

class Events extends React.Component {

  state = {
    eventos: [],
    loading: true,
    error: null,
  };

  getEventos = async () => {
    try {
      const eventos = await getEventos();
      this.setState({ eventos, loading: false });
    } catch (error) {
      this.setState({ error, loading: false });
    }
  };


  getEventosByLevel = async (event) => {
    try {
      const eventos = await getEventosByLevel(event);
      this.setState({ eventos, loading: false });
    } catch (error) {
      this.setState({ error, loading: false });
    }
  };

  componentDidMount() {
    this.getEventos();
  }

  render() {
    return (
      <Container fluid="true">
        <Filter getEventosByLevel={this.getEventosByLevel} />
        <List eventos={this.state.eventos} />
      </Container>
    )
  }
}

export default Events