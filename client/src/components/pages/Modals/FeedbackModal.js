import { Button } from "@material-ui/core"
import React from "react"
import { Modal } from "react-bootstrap"

export const FeedbackModal = ({ show, onhide }) => {
  return (
    <div className="modal-feedback">
      <div className="modal-feedback-wrapper">
        <Modal show={show} onHide={onhide} centered>
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Modal body text goes here.Modal body text goes here.</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary">Close</Button>
            <Button variant="primary">Save changes</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}
