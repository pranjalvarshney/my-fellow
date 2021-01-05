import { Button, Grid, TextField } from "@material-ui/core"
import React, { useContext, useState } from "react"
import { Modal } from "react-bootstrap"
import { AuthContext } from "../../../context/authContext/authContext"

export const PollModal = ({
  show,
  handleModal,
  modalTitle,
  pollFunction,
  poll,
}) => {
  const authContext = useContext(AuthContext)
  const [title, setTitle] = useState("")
  const [pollBody, setPollBody] = useState("")

  const pollData = {
    user: authContext.user._id,
    title,
    poll: pollBody,
  }
  const handleBtnSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await pollFunction(authContext.user._id, pollData)
      console.log(response)
      handleModal()
    } catch (error) {
      console.log(error.response.data.errorMsg)
    }
  }
  const styleTheme =
    authContext.theme === "dark"
      ? { background: "#121212", color: "whitesmoke" }
      : null
  const styleThemeMain =
    authContext.theme === "dark" ? { background: "rgb(0 0 0 / 88%)" } : null

  return (
    <Modal show={show} onHide={handleModal} centered style={styleThemeMain}>
      <Modal.Header closeButton style={styleTheme}>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>

      <Modal.Body style={styleTheme}>
        <form onSubmit={handleBtnSubmit}>
          <Grid container justify="space-between" direction="row">
            <Grid item container direction="column">
              <Grid item>
                <TextField
                  className="mb-3"
                  variant="outlined"
                  placeholder="Title"
                  size="small"
                  fullWidth
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                  multiline
                  fullWidth
                  className="mb-3"
                  variant="outlined"
                  rows={4}
                  placeholder="Poll"
                  size="small"
                  value={pollBody}
                  onChange={(e) => setPollBody(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Modal.Body>
      <Modal.Footer style={styleTheme}>
        <Button size="small" onClick={handleModal}>
          Discard
        </Button>
        <Button type="submit" size="small" onClick={handleBtnSubmit}>
          Done
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
