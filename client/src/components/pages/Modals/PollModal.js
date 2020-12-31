import { Button, Grid, TextField } from "@material-ui/core"
import React, { useState } from "react"
import { Modal } from "react-bootstrap"

export const PollModal = ({ show, handleModal, modalTitle, handleForm }) => {
  const [title, setTitle] = useState("")
  const [poll, setPoll] = useState("")

  return (
    <Modal show={show} onHide={handleModal} centered id="input-modal">
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleForm}>
          <Grid container justify="space-between" direction="row">
            <Grid item container direction="column" md={4}>
              <Grid item>
                <TextField
                  className="mb-3"
                  variant="outlined"
                  placeholder="title"
                  size="small"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                  className="mb-3"
                  variant="outlined"
                  rows={2}
                  placeholder="title"
                  size="small"
                  value={poll}
                  onChange={(e) => setPoll(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button size="small" onClick={handleModal}>
          Discard
        </Button>
        <Button type="submit" size="small" onClick={handleForm}>
          Done
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
