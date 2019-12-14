import React, { useState } from 'react';
import { Pagination, Col } from "react-bootstrap";

function PaginationList({ pagination, items }) {

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