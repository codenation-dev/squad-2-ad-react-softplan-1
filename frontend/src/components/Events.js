import React from "react";
import { Filter } from "./Filter";
import { List } from "./List";
import { Container } from 'react-bootstrap';
import { getEventos } from "../Api";
import Header from "./Header";
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

class Events extends React.Component {

  state = {
    eventos: [],
    isLoading: true,
    error: null,
    pagination: {
      linesPerPage: 10,
      orderByField: "createdAt",
      orderByDirection: "ASC",
      pageNo: 0,
      totalPages: 0,
      totalElements: 0,
      number: 0,
    },
    paramsState: {},
    list: [],

  };

  getEventos = async (paginationState, paramsState) => {
    try {
      const result = await getEventos(paginationState, paramsState);
      const eventos = result.content
      const pagination = {
        linesPerPage: result.size,
        pageNo: result.number,
        orderByField: paginationState.orderByField,
        orderByDirection: "ASC",
        totalPages: result.totalPages,
        totalElements: result.totalElements,
        number: result.number,
      }
      this.setState({ eventos, pagination, paramsState, isLoading: false });
    } catch (error) {
      this.setState({ error, isLoading: false });
    }
  };

  setPagination = (page = 1, itensPerPage = 10, orderBy = "createdAt") => {
    const pagination = this.state.pagination
    const paramsState = this.state.paramsState
    pagination.pageNo = page - 1;
    pagination.linesPerPage = itensPerPage;
    pagination.orderByField = orderBy;
    this.setState({ isLoading: true });
    this.setState({ pagination });
    this.getEventos(pagination, paramsState);
  };

  setParams = ({ environment, filterKey = null, filterValue = null }) => {    
    const paramsState = {}
    const paginationNew = this.state.pagination
    paginationNew.pageNo = 0

    if (environment) {
      paramsState.environment = environment
    }
    if (filterKey) {
      paramsState.filterKey = filterKey
    }
    if (filterValue) {
      paramsState.filterValue = filterValue
    }
    this.setState({ isLoading: true });
    this.getEventos(paginationNew, paramsState);
  }

  componentDidMount() {
    this.getEventos(this.state.pagination);
  }

  render() {
    return (
      
      <Container fluid="true">
          <Header />
          <Filter list={this.state.list} setParams={this.setParams} />
          
          <BlockUi tag="div" blocking={this.state.isLoading} keepInView>
            <List eventos={this.state.eventos} pagination={this.state.pagination} setPagination={this.setPagination} /> 
          </BlockUi>
          
          {/* { this.state.isLoading ? <div id="loader"/> :  
            <List eventos={this.state.eventos} pagination={this.state.pagination} setPagination={this.setPagination} /> 
          } */}
      </Container>
    )
  }
}

export default Events