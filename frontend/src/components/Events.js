import React from "react";
import { Filter } from "./Filter";
import { List } from "./List";
import { Container } from 'react-bootstrap';
import { getEventos} from "../Api";

class Events extends React.Component {

  state = {
    eventos: [],
    loading: true,
    error: null,
    pagination:{
      linesPerPage:10, 
      orderByField:"createdAt", 
      orderByDirection:"ASC", 
      pageNo:0,
      totalPages: 0,
      totalElements: 0,
      number: 0,
    },
    paramsState: {}

  };

  getEventos = async (paginationState,paramsState) => {
    try {
      const result = await getEventos(paginationState, paramsState);
      const eventos = result.content
      const pagination = {
        linesPerPage:result.numberOfElements, 
        pageNo:result.number,
        orderByField:"createdAt", 
        orderByDirection:"ASC",
        totalPages:result.totalPages,
        totalElements:result.totalElements,
        number:result.number,
      }
      this.setState({ eventos, pagination, paramsState, loading: false });
    } catch (error) {
      this.setState({ error, loading: false });
    }
  };

  setPagination = (page) => {
    const paginationNew = this.state.pagination
    paginationNew.pageNo = page-1;
    this.getEventos(paginationNew);
  };

  setParams = (environment, filterKey=null, filterValue=null) => {
    const paramsState = {}
    const paginationNew = this.state.pagination

    if(environment){
      paramsState.environment = environment
    }
    if(filterKey){
      paramsState.filterKey = filterKey
    }
    if(filterValue){
      paramsState.filterValue = filterValue
    }
    this.getEventos(paginationNew, paramsState);
  }

  componentDidMount() {
    this.getEventos(this.state.pagination);
  }

  

  render() {
    return (
      <Container fluid="true">
        <Filter setParams={this.setParams} />
        <List eventos={this.state.eventos} pagination={this.state.pagination} setPagination={this.setPagination}/>
      </Container>
    )
  }
}

export default Events