import { Button, Grid, TextField } from "@material-ui/core"
import React, { useContext, useState } from "react"
import { Modal } from "react-bootstrap"
import { UserContext } from "../../../context/userContext/UserContext"
export const EditProfileModal = ({ show, onHide }) => {
  const userContext = useContext(UserContext)
  const [userDetails, setUserDetails] = useState({
    name: userContext.user.name,
    age: userContext.user.age,
    email: userContext.user.email,
    dob: userContext.user.dob,
    bio: userContext.user.bio,
    rollno: userContext.user.rollno,
  })
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
              name="name"
              variant="outlined"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              label="Full Name"
              className="mt-3"
              value={userDetails.name}
            />
            <Grid container justify="space-between" spacing={3}>
              <Grid item xs={7}>
                <TextField
                  disabled
                  variant="outlined"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  value={userDetails.email}
                  label="E-mail"
                  className="mt-3"
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  disabled
                  variant="outlined"
                  value={userDetails.rollno}
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  label="Roll No."
                  className="mt-3"
                />
              </Grid>
            </Grid>
            <TextField
              variant="outlined"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
              className="mt-3"
              fullWidth
              multiline
              rows={2}
              value={userDetails.bio}
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
