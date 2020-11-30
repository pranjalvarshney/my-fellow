import { Grid, TextareaAutosize } from "@material-ui/core"
import React from "react"
import { Modal, Button, Form } from "react-bootstrap"

export const CreatePost = ({ show, handleModal }) => {
  return (
    <Modal show={show} onHide={handleModal} centered id="input-modal">
      <Modal.Header closeButton>
        <Modal.Title>Create Post</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Grid container justify="space-around" direction="row" md={12}>
          <Grid item container direction="column" md={4}>
            <Grid item>
              <TextareaAutosize
                style={{ padding: "10px" }}
                rowsMin={4}
                placeholder="Write a caption..."
              />
            </Grid>
            <Grid item>
              <Form.File
                id="exampleFormControlFile1"
                label="Example file input"
              />
            </Grid>
          </Grid>
          <Grid item md={7}></Grid>
        </Grid>
      </Modal.Body>
      <Modal.Footer>
        <Button size="small" variant="secondary" onClick={handleModal}>
          Discard
        </Button>
        <Button size="small" variant="primary" onClick={handleModal}>
          Done
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
