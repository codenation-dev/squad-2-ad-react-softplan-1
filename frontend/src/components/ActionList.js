// import React, { useState, useEffect } from "react";
// import { shelveEvents, deleteEvents } from "../Api";
// import { Form, Col, Modal, Button } from "react-bootstrap";
// import { getEnvironmentList, getFilterKeyList } from "./../Api";

// function ActionList({ eventos, pagination, setPagination }) {

//   const [showDialogDelete, setShowDialogDelete] = useState(false);
//   const handleDialogDeleteClose = () => setShowDialogDelete(false);
//   const handleDialogDeleteShow = () => {
//     if (selectedRows.length > 0) {
//       setShowDialogDelete(true);
//     } else {
//       handleShowUnselectedRows();
//     }
//   };

//   const [showDialogShelve, setShowDialogShelve] = useState(false);
//   const handleDialogShelveClose = () => setShowDialogShelve(false);
//   const handleDialogShelveShow = () => {
//     if (selectedRows.length > 0) {
//       setShowDialogShelve(true);
//     } else {
//       handleShowUnselectedRows();
//     }
//   };
  
  
  
  
//   const handleDialogDeleteAccept = () => {
//     handleDeleteClick();
//     setShowDialogDelete(false);
//   };

//   const handleDialogShelveAccept = () => {
//     handleShelveClick();
//     setShowDialogShelve(false);
//   };

//   function handleSelectAllByButton(evt) {
//     document.getElementById("selectAll").click();
//   }
  

//   const handleShelveClick = async () => {
//     await shelveEvents(selectedRows);
//     setPagination(1, itensPerPage, orderBy);
//     setSelectedRows([]);
//   };

//   const handleDeleteClick = async () => {
//     await deleteEvents(selectedRows);
//     setPagination(1, itensPerPage, orderBy);
//     setSelectedRows([]);
//   };

//   return(
//     <>
//       <Form.Row>
//         <Form.Group as={Col} xs="12">
//           <ButtonToolbar>
//             <Button variant="secondary" className="button-tolbar mr-2 mb-2" onClick={handleDialogShelveShow}>
//               Shelve items
//             </Button>
//             <Button variant="danger" className="button-tolbar mr-2 mb-2" onClick={handleDialogDeleteShow}>
//               Delete items
//             </Button>
//             <Button id="btn-select-all" className="button-tolbar mr-2 mb-2" variant="primary" onClick={handleSelectAllByButton}>
//               Select All
//             </Button>
//           </ButtonToolbar>
//         </Form.Group>
//       </Form.Row>
//       <Modal show={showDialogShelve} onHide={handleDialogShelveClose}>
//         <Modal.Header closeButton>
//           <Modal.Title style={{ color: "#000" }}>Shelve items</Modal.Title>
//         </Modal.Header>
//         <Modal.Body style={{ color: "#000" }}>
//           Do you really want to shelve the selected events?
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleDialogShelveClose}>
//             No
//           </Button>
//           <Button variant="primary" onClick={handleDialogShelveAccept}>
//             Yes
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       <Modal show={showDialogDelete} onHide={handleDialogDeleteClose}>
//         <Modal.Header closeButton>
//           <Modal.Title style={{ color: "#000" }}>Delete items</Modal.Title>
//         </Modal.Header>
//         <Modal.Body style={{ color: "#000" }}>
//           Do you really want to delete the selected events?
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleDialogDeleteClose}>
//             No
//           </Button>
//           <Button variant="primary" onClick={handleDialogDeleteAccept}>
//             Yes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
        
//   )

// }
// export { ActionList }