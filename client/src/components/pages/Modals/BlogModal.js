import { Button, Grid, TextareaAutosize, TextField } from "@material-ui/core"
import React, { useContext, useState } from "react"
import { AuthContext } from "../../../context/authContext/authContext"
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate"
import { Form, Modal } from "react-bootstrap"

export const BlogModal = ({
  show,
  handleModal,
  blogFunction,
  modalTitle,
  blog,
}) => {
  const authContext = useContext(AuthContext)
  const [uploadFile, setUploadFile] = useState(null)
  const [preview, setPreview] = useState(blog === undefined ? "" : blog.picture)
  const [content, setContent] = useState(blog === undefined ? "" : blog.content)
  const [title, setTitle] = useState(blog === undefined ? "" : blog.title)

  console.log(preview)
  const handleForm = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("user", authContext.user._id)
    formData.append("title", title)
    formData.append("content", content)
    formData.append("picture", uploadFile)
    blog
      ? blogFunction(formData, authContext.user._id, blog._id)
      : blogFunction(formData, authContext.user._id)
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
                <TextField
                  className="mb-3"
                  variant="outlined"
                  placeholder="title"
                  size="small"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
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
