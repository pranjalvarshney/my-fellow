import { Button, Grid, TextField } from "@material-ui/core"
import React, { useContext, useState } from "react"
import { Form, Modal } from "react-bootstrap"
import { AuthContext } from "../../../context/authContext/authContext"
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate"

export const AdsModal = ({
  show,
  handleModal,
  adsFunction,
  modalTitle,
  ads,
}) => {
  const authContext = useContext(AuthContext)
  const [uploadFile, setUploadFile] = useState(null)
  const [preview, setPreview] = useState(ads === undefined ? "" : ads.picture)
  const [content, setContent] = useState(ads === undefined ? "" : ads.content)
  const [title, setTitle] = useState(ads === undefined ? "" : ads.title)
  const [contact, setContact] = useState(ads === undefined ? "" : ads.contact)

  console.log(preview)
  const handleForm = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("user", authContext.user._id)
    formData.append("title", title)
    formData.append("contact", contact)
    formData.append("content", content)
    formData.append("picture", uploadFile)
    ads
      ? adsFunction(formData, authContext.user._id, ads._id)
      : adsFunction(formData, authContext.user._id)
    handleModal()
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
      onHide={handleModal}
      centered
      size="lg"
      id="input-modal"
      style={styleThemeMain}
    >
      <Modal.Header closeButton style={styleTheme}>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>

      <Modal.Body style={styleTheme}>
        <form onSubmit={handleForm}>
          <Grid container justify="space-between" direction="row" spacing={3}>
            <Grid item container direction="column" md={6}>
              <Grid item>
                <TextField
                  className="mb-3"
                  variant="outlined"
                  placeholder="title"
                  size="small"
                  value={title}
                  fullWidth
                  onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                  className="mb-3"
                  size="small"
                  fullWidth
                  variant="outlined"
                  placeholder="Write a caption..."
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
                <TextField
                  size="small"
                  rows={5}
                  className="mb-3"
                  fullWidth
                  multiline
                  variant="outlined"
                  placeholder="Write a caption..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Grid>
              <Grid item>
                <Form.File
                  type="file"
                  onChange={(e) => {
                    setUploadFile(e.target.files[0])
                    setPreview(URL.createObjectURL(e.target.files[0]))
                  }}
                  label="Upload media"
                  multiple
                />
              </Grid>
            </Grid>
            <Grid item md={6}>
              {uploadFile || preview ? (
                <img src={preview} alt="input file" width="100%" />
              ) : (
                <div
                  className="container"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "60%",
                    flexDirection: "column",
                  }}
                >
                  <AddPhotoAlternateIcon fontSize="large" />
                  <h6>Image Preview</h6>
                </div>
              )}
            </Grid>
          </Grid>
        </form>
      </Modal.Body>
      <Modal.Footer style={styleTheme}>
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
