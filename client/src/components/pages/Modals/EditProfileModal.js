import {
  Button,
  Grid,
  Snackbar,
  SnackbarContent,
  TextField,
  Typography,
} from "@material-ui/core"
import React, { useContext, useEffect, useState } from "react"
import { Modal } from "react-bootstrap"
import { AuthContext } from "../../../context/authContext/authContext"
import { UserContext } from "../../../context/userContext/UserContext"
export const EditProfileModal = ({ show, onHide }) => {
  const userContext = useContext(UserContext)
  const authContext = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [color, setColor] = useState(null)
  const [error, setError] = useState("")
  const [userDetails, setUserDetails] = useState({
    name: "",
    age: "",
    email: "",
    dob: "",
    rollno: "",
    branch: "",
    intro: "",
    year: "",
  })
  useEffect(() => {
    setUserDetails({
      ...userDetails,
      name: userContext.user.name,
      email: userContext.user.email,
      intro: userContext.user.intro,
      rollno: userContext.user.rollno,
      branch: userContext.user.branch,
      year: userContext.user.year,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleChangeData = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    })
  }
  const formData = {
    name: userDetails.name,
    intro: userDetails.intro,
    branch: userDetails.branch,
    year: userDetails.year,
  }
  const handleForm = async (e) => {
    e.preventDefault()
    console.log(userDetails.year)
    try {
      setLoading(true)
      const response = await userContext.updateUserProfileDetails(
        authContext.user._id,
        formData
      )
      if (response) {
        setLoading(false)
        setError(false)
        setColor("green")
        onHide()
        window.location.reload()
      }
    } catch (error) {
      setLoading(false)
      setColor("tomato")
      setError(error.response.data.errorMsg)
      // console.log(error)
    }
  }
  const handleClose = () => {
    setColor("")
    setLoading(false)
    setError("")
  }
  const showResponseMsg = () => {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={error === "" ? false : true}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <SnackbarContent
          message={error}
          style={{
            background: color,
            display: "flex",
            justifyContent: "center",
          }}
        />
      </Snackbar>
    )
  }
  const styleTheme =
    authContext.theme === "dark"
      ? { background: "#121212", color: "whitesmoke" }
      : null
  const styleThemeMain =
    authContext.theme === "dark" ? { background: "rgb(0 0 0 / 88%)" } : null

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      backdrop="static"
      id="input-modal"
      style={styleThemeMain}
    >
      {showResponseMsg()}

      <Modal.Header closeButton style={styleTheme}>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Profile
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={styleTheme}>
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
              <Grid item xs={6}>
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
              <Grid item xs={4}>
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
              <Grid item xs={2}>
                <TextField
                  variant="outlined"
                  name="year"
                  value={userDetails.year}
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  label="Year"
                  className="mt-3"
                  onChange={handleChangeData}
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
              value={userDetails.intro}
              label="Intro"
            />
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer style={styleTheme}>
        <Button onClick={onHide}>Close</Button>
        <Button
          type="submit"
          onClick={handleForm}
          color="primary"
          className="ml-3"
          variant="outlined"
        >
          {loading ? "..." : "Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
