import React, { Component } from 'react';
import { Button, Container } from 'react-bootstrap';
import { DetailItem } from './DetailItem';
import { getEventById } from '../Api';

export default class Detail extends Component {
  state = {
    eventID: this.props.eventId,
    dataEvent: [],
    loading: true,
    error: null
  }

  getEventById = async (eventID) => {
    try {
      const dataEvent = await getEventById(eventID);
      this.setState({ dataEvent, loading: false });
    } catch (error) {
      this.setState({ error, loading: false });
    }
  }

  componentDidMount() {
    this.getEventById(this.state.eventID);
  }

  render(){
    return(
      <React.Fragment>
        <Container className="mt-5" fluid="true">
          <DetailItem dataEvent={ this.state.dataEvent } />
        </Container>
      </React.Fragment>
    );
  }
} 