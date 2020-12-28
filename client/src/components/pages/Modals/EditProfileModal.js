import { Button, Grid, TextField, Typography } from "@material-ui/core"
import React, { useContext, useEffect, useState } from "react"
import { Modal } from "react-bootstrap"
import { AuthContext } from "../../../context/authContext/authContext"
import { UserContext } from "../../../context/userContext/UserContext"
export const EditProfileModal = ({ show, onHide }) => {
  const userContext = useContext(UserContext)
  const authContext = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [userDetails, setUserDetails] = useState({
    name: "",
    age: "",
    email: "",
    dob: "",
    rollno: "",
    branch: "",
    intro: "",
  })
  useEffect(() => {
    setUserDetails({
      name: userContext.user.name,
      age: userContext.user.age,
      email: userContext.user.email,
      dob: userContext.user.dob,
      intro: userContext.user.intro,
      rollno: userContext.user.rollno,
      branch: userContext.user.branch,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleChangeData = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    })
  }
  const handleForm = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await userContext.updateUserProfileDetails(
        authContext.user._id,
        userDetails
      )
      if (response) {
        setLoading(false)
        onHide()
        alert("userDetails updated")
      }
    } catch (error) {
      setLoading(false)

      console.log(error.response.data.errorMsg)
    }
  }
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
          {userContext.user.role === 0 && (
            <Typography variant="button" color="primary" gutterBottom>
              Student Profile
            </Typography>
          )}
          {userContext.user.role === 1 && (
            <Typography variant="button" color="primary" gutterBottom>
              Faculty Profile
            </Typography>
          )}
          <form onSubmit={handleForm}>
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
              onChange={handleChangeData}
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
              name="branch"
              variant="outlined"
              value={userDetails.branch}
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChangeData}
              fullWidth
              label="Branch"
              className="mt-3"
            />
            <TextField
              variant="outlined"
              size="small"
              name="intro"
              onChange={handleChangeData}
              InputLabelProps={{
                shrink: true,
              }}
              className="mt-3"
              fullWidth
              multiline
              rows={3}
              value={userDetails.bio}
              label="Intro"
            />
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
        <Button
          type="submit"
          onClick={handleForm}
          color="primary"
          className="ml-3"
          variant="outlined"
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
