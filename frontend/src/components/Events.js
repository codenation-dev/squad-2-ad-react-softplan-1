import React, { useEffect } from "react";
import { Filter } from "./Filter";
import { CustomView } from "./CustomView";
// import { ActionList } from "./ActionList";
import { List } from "./List";
import PaginationList from "./PaginationList";
import { Container, Card, Row } from "react-bootstrap";
import { getEvents } from "../Api";
import Header from "./Header";
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";

import { useSelector, useDispatch } from "react-redux";
import { Creators as Actions } from "./../store/ducks/events";

//Rever para mudar para hooks
const Events = () => {
  const state = useSelector(state => state.events);
  const dispatch = useDispatch();
  // state = {
  //   eventos: [],
  //   isLoading: true,
  //   error: null,
  //   pagination: {
  //     linesPerPage: 10,
  //     orderByField: "createdAt",
  //     orderByDirection: "ASC",
  //     pageNo: 0,
  //     totalPages: 0,
  //     totalElements: 0,
  //     number: 0
  //   },
  //   paramsState: {},
  //   list: []
  // };

  // getEventos = async (paginationState, paramsState) => {
  //   try {
  //     const result = await getEventos(paginationState, paramsState);
  //     const eventos = result.content;
  //     const pagination = {
  //       linesPerPage: result.size,
  //       pageNo: result.number,
  //       orderByField: paginationState.orderByField,
  //       orderByDirection: "ASC",
  //       totalPages: result.totalPages,
  //       totalElements: result.totalElements,
  //       number: result.number
  //     };
  //     this.setState({ eventos, pagination, paramsState, isLoading: false });
  //   } catch (error) {
  //     this.setState({ error, isLoading: false });
  //   }
  // };

  // setPagination = (page = 1, itensPerPage = 10, orderBy = "createdAt") => {
  //   const pagination = this.state.pagination;
  //   const paramsState = this.state.paramsState;
  //   pagination.pageNo = page - 1;
  //   pagination.linesPerPage = itensPerPage;
  //   pagination.orderByField = orderBy;
  //   this.setState({ isLoading: true });
  //   this.setState({ pagination });
  //   this.getEventos(pagination, paramsState);
  //   console.log("setState", this.state);
  // };

  // setParams = ({ environment, filterKey = null, filterValue = null }) => {
  //   const paramsState = {};
  //   const paginationNew = this.state.pagination;
  //   paginationNew.pageNo = 0;

  //   if (environment) {
  //     paramsState.environment = environment;
  //   }
  //   if (filterKey) {
  //     paramsState.filterKey = filterKey;
  //   }
  //   if (filterValue) {
  //     paramsState.filterValue = filterValue;
  //   }
  //   this.setState({ isLoading: true });
  //   this.getEventos(paginationNew, paramsState);
  // };

  useEffect(() => {
    getEvents(dispatch);
  }, []);

  return (
    <Container fluid="true">
      <Header />
      <Filter />

      {console.log({ state })}

      <BlockUi tag="div" blocking={state.isLoading} keepInView>
        <Card className="mt-3">
          <Card.Body>
            <CustomView
              pagination={state.pagination}
              // setPagination={setPagination}
            />
            {/* <ActionList pagination={this.state.pagination} setPagination={this.setPagination}/> */}
            <List
              eventos={state.eventos}
              pagination={state.pagination}
              // setPagination={setPagination}
            />
            <Row>
              {/* <PaginationList
                eventos={this.state.eventos}
                pagination={this.state.pagination}
                setPagination={this.setPagination}
              /> */}
            </Row>
          </Card.Body>
        </Card>
      </BlockUi>

      {/* { this.state.isLoading ? <div id="loader"/> :  
            <List eventos={this.state.eventos} pagination={this.state.pagination} setPagination={this.setPagination} /> 
          } */}
    </Container>
  );
};

export default Events;
