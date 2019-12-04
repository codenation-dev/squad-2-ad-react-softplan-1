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
      pagination:{
        linesPerPage:10, 
        orderByField:"createdAt", 
        orderByDirection:"ASC", 
        pageNo:0,
        totalPages: 0,
        totalElements: 0,
        number: 0,
      }
    };
  
    getEventos = async () => {
      try {
        const result = await getEventos(this.state.pagination);
        const eventos = result.content
        const pagination = {
          linesPerPage:result.linesPerPage, 
          orderByField:result.linesPerPage, 
          orderByDirection:result.linesPerPage, 
          pageNo:result.linesPerPage,
          totalPages:result.totalPages,
          totalElements:result.totalElements,
          number:result.number,
        }
        this.setState({ eventos, pagination, loading: false });
      } catch (error) {
        this.setState({ error, loading: false });
      }
    };


    getEventosByLevel = async (event) => {
      try {
        const eventos = await getEventosByLevel(event);
        console.log("conteudo", eventos);
        this.setState({ eventos, loading: false });
      } catch (error) {
        this.setState({ error, loading: false });
      }
    };

    setPagination = (pagination) => {
      this.setState({pagination})
    };

    componentDidMount() {
      this.getEventos();
    }
    
    render(){
    return (
      <Container fluid="true">
        <Filter getEventosByLevel={this.getEventosByLevel} />
        <List eventos={this.state.eventos} pagination={this.state.pagination} setPagination={this.setPagination}/>
      </Container>
    )}
}

export default Events