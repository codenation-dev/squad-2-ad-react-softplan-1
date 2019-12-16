import React from 'react';
import { Pagination, Col } from "react-bootstrap";

function PaginationList({ eventos, pagination, setPagination }) {

  let items = [];

  const setPage = page => {
    setPagination(page, pagination.linesPerPage, pagination.orderByField);
  };

  for (let number = 1; number <= pagination.totalPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number - 1 === pagination.number}
        onClick={() => setPage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  const showInfo = () => {
    if(pagination.totalElements === 0){
      return '';
    }
    const start =
      pagination.number === 0
        ? 1
        : pagination.number * pagination.linesPerPage + 1;

    const end =
      pagination.number === 0
        ? pagination.linesPerPage
        : (pagination.number + 1) * pagination.linesPerPage <
          pagination.totalElements
        ? (pagination.number + 1) * pagination.linesPerPage
        : pagination.totalElements;

    return `Showing ${start} to ${end}  of ${pagination.totalElements} records`;
  };

  return(
    <>
      <Col lg={3} className="text-dark">
        {showInfo()}
      </Col>
      <Col className="d-flex justify-content-lg-end">
        <Pagination size="sm">{items}</Pagination>
      </Col>
    </>
  );
}

export default PaginationList;