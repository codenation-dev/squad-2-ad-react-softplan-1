import React from "react";
import { Filter } from "./Filter";
import { List } from "./List";
import { Container } from 'react-bootstrap';
import { getEventos, getList} from "../Api";
import Header from "./Header";

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
    paramsState: {},
    list:[],

  };

  getEventos = async (paginationState,paramsState) => {
    try {
      console.log(this.state);
      const result = await getEventos(paginationState, paramsState);
      const eventos = result.content
      const pagination = {
        linesPerPage:result.size, 
        pageNo:result.number,
        orderByField:paginationState.orderByField, 
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

  setPagination = (page=1, itensPerPage=10, orderBy="createdAt") => {
    const pagination = this.state.pagination
    const paramsState = this.state.paramsState
    pagination.pageNo = page-1;
    pagination.linesPerPage = itensPerPage;
    pagination.orderByField = orderBy;
    this.setState({pagination})
    this.getEventos(pagination, paramsState);
  };

  setParams = ({environment, filterKey=null, filterValue=null}) => {
    const paramsState = {}
    const paginationNew = this.state.pagination
    paginationNew.pageNo = 0

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
    //const list = getList();
    //this.setState({list});
    this.setState({ loading: true })
    this.getEventos(this.state.pagination);
  }

  render() {
    return (
      <Container fluid="true">
        <Header />
        <Filter list={this.state.list} setParams={this.setParams} />
        <List eventos={this.state.eventos} pagination={this.state.pagination} setPagination={this.setPagination}/>
      </Container>
    )
  }
}

export default Events