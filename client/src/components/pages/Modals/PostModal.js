import { Grid, Button, TextareaAutosize } from "@material-ui/core"
import React, { useContext, useState } from "react"
import { Modal, Form } from "react-bootstrap"
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate"
import { AuthContext } from "../../../context/authContext/authContext"

export const PostModal = ({
  show,
  handleModal,
  postFunction,
  modalTitle,
  post,
}) => {
  const authContext = useContext(AuthContext)
  const [uploadFile, setUploadFile] = useState(null)
  const [preview, setPreview] = useState(
    post === undefined ? "" : post.picture[0]
  )
  const [content, setContent] = useState(post === undefined ? "" : post.content)
  console.log(preview)
  const handleForm = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("user", authContext.user._id)
    formData.append("content", content)
    formData.append("picture", uploadFile)
    post
      ? postFunction(formData, authContext.user._id, post._id)
      : postFunction(formData, authContext.user._id)
    handleModal()
  }

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
                    fltrueexDirection: "column",
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
