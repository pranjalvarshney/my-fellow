import { Button, Snackbar, SnackbarContent } from "@material-ui/core"
import React, { useContext, useState } from "react"
import { Modal } from "react-bootstrap"
import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import { faPaperclip } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import { API } from "../../../utils/proxy"
import { AuthContext } from "../../../context/authContext/authContext"

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}))

export const FeedbackModal = ({ show, onhide }) => {
  const classes = useStyles()
  const authContext = useContext(AuthContext)
  const [value, setValue] = React.useState("")
  const [preview, setPreview] = useState("")
  const [picture, setPicture] = useState("")
  const [color, setColor] = useState(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const handleSubmit = async () => {
    const formData = new FormData()
    formData.append("feedback", value)
    formData.append("picture", picture)

    try {
      setLoading(true)
      setError("")
      const response = await axios.post(
        `${API}/create/feedback/${authContext.user._id}`,
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("_token")
            )}`,
          },
        }
      )
      if (response) {
        setSuccess("Thanks for your feedback!")
        setLoading(false)
        setError("")
        setColor("green")
        // console.log(response)
      }
    } catch (error) {
      setLoading(false)
      setColor("tomato")
      setError(error.response.data.errorMsg)
      // console.log(error.response.data.errorMsg)
    }
  }
  const handleClose = () => {
    setColor(null)
    setLoading(false)
    setSuccess(false)
    setError("")
  }
  const showResponseMsg = () => {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={error || success}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <SnackbarContent
          message={success || error}
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
    <div className="modal-feedback">
      {showResponseMsg()}
      <div className="modal-feedback-wrapper">
        <Modal
          show={show}
          onHide={onhide}
          centered
          size="lg"
          style={styleThemeMain}
          id="input-modal"
        >
          <Modal.Header closeButton style={styleTheme}>
            <Modal.Title className="ml-auto">Feedback Form</Modal.Title>
          </Modal.Header>
          <Modal.Body style={styleTheme}>
            <form
              className={classes.root}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <div className="text-center">
                <TextField
                  id="filled-multiline-static"
                  label="Feedback"
                  multiline
                  rows={4}
                  rowsMax={6}
                  variant="outlined"
                  className="w-100 mx-auto"
                  value={value}
                  onChange={handleChange}
                />
                <input
                  accept="image/*, video/*"
                  className={classes.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={(e) => {
                    setPicture(e.target.files[0])
                    setPreview(URL.createObjectURL(e.target.files[0]))
                  }}
                />
                <label htmlFor="contained-button-file">
                  <Button variant="contained" color="primary" component="span">
                    <FontAwesomeIcon icon={faPaperclip} className="mr-2" />
                    Share a Screenshot or a Video
                  </Button>
                </label>
              </div>
              {preview === "" ? null : (
                <img src={preview} alt="upload preview" width="100%" />
              )}
            </form>
          </Modal.Body>

          <Modal.Footer style={styleTheme}>
            <Button className="mr-3" variant="contained" onClick={onhide}>
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              variant="contained"
              style={{ background: "cyan", color: ":white" }}
            >
              {loading ? (
                <div className="spinner-border" role="status">
                  <span className="visually-hidden"></span>
                </div>
              ) : (
                "Submit"
              )}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}
