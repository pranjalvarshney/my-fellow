import { Grid, Button, TextareaAutosize } from "@material-ui/core"
import React, { useState } from "react"
import { Modal, Form } from "react-bootstrap"

export const CreatePost = ({ show, handleModal }) => {
  const [uploadFile, setUploadFile] = useState(null)
  const [content, setContent] = useState("")
  return (
    <Modal show={show} onHide={handleModal} centered id="input-modal">
      <Modal.Header closeButton>
        <Modal.Title>Create Post</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Grid container justify="space-between" direction="row" md={12}>
          <Grid item container direction="column" md={4}>
            <Grid item>
              <TextareaAutosize
                style={{ padding: "10px" }}
                rowsMin={4}
                placeholder="Write a caption..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Form.File
                type="file"
                onChange={(e) =>
                  setUploadFile(URL.createObjectURL(e.target.files[0]))
                }
                id="exampleFormControlFile1"
                label="Upload media"
              />
            </Grid>
          </Grid>
          <Grid item md={6}>
            <img src={uploadFile} alt="input file" width="100%" />
          </Grid>
        </Grid>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModal}>
          Discard
        </Button>
        <Button size="small" variant="primary" onClick={handleModal}>
          Done
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
