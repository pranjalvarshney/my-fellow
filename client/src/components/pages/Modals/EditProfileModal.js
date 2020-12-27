import { Button, Grid, TextField } from "@material-ui/core"
import React from "react"
import { Modal } from "react-bootstrap"

export const EditProfileModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Profile
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          style={{
            height: "300px",
            overflowX: "hidden",
            overflowY: "auto",
            padding: "0 16px",
          }}
        >
          <form>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              label="Full Name"
              className="mt-3"
            />
            <Grid container justify="space-between" spacing={3}>
              <Grid item xs={7}>
                <TextField
                  disabled
                  variant="outlined"
                  size="small"
                  fullWidth
                  label="E-mail"
                  className="mt-3"
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  disabled
                  variant="outlined"
                  size="small"
                  fullWidth
                  label="Roll No."
                  className="mt-3"
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} justify="flex-start">
              <Grid item xs={4}>
                <TextField
                  variant="outlined"
                  className="mt-3"
                  size="small"
                  label="Date of birth"
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  className="mt-3"
                  variant="outlined"
                  size="small"
                  label="Age"
                />
              </Grid>
            </Grid>
            <TextField
              variant="outlined"
              size="small"
              className="mt-3"
              fullWidth
              multiline
              rows={2}
              label="Intro"
            />
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
        <Button color="primary" className="ml-3" variant="outlined">
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
