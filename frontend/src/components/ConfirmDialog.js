import React from "react";
import { Button, Modal } from "react-bootstrap";

const ConfirmDialog = (
  title,
  body,
  showDialogShelve,
  handleDialogShelveClose,
  handleDialogShelveAccept
) => {
  return (
    <Modal show={showDialogShelve} onHide={handleDialogShelveClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "#000" }}>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ color: "#000" }}>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleDialogShelveClose}>
          No
        </Button>
        <Button variant="primary" onClick={handleDialogShelveAccept}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { ConfirmDialog };
