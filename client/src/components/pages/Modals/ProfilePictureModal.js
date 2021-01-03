import { Avatar, Button, Grid, makeStyles, Typography } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { Modal } from "react-bootstrap"
import { API } from "../../../utils/proxy"

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
export const ProfilePictureModal = ({ show, onHide, userContext }) => {
  const classes = useStyles()
  const [avatarSrc, setAvatarSrc] = useState("")
  const [avatarAlt, setAvatarAlt] = useState("")
  const [uploadFile, setUploadFile] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setAvatarAlt(userContext.user.name)
    setAvatarSrc(`${API}/pic/user/${userContext.user._id}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleSubmitBtn = async () => {
    const formData = new FormData()
    formData.append("pic", uploadFile)
    try {
      setLoading(true)
      const response = await userContext.updateProfilePicture(
        userContext.user._id,
        formData
      )
      if (response.status === 200) {
        setLoading(false)
        onHide()
        window.location.reload()
      }
    } catch (error) {
      setLoading(false)
      alert(error.response.data.errorMsg)
    }
  }
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      backdrop="static"
      id="input-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Profile Picture</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Grid container justify="center" alignItems="center" spacing={10}>
          <Grid item>
            <Avatar
              style={{ width: "200px", height: "200px" }}
              alt={avatarAlt}
              src={avatarSrc}
            />
          </Grid>
          <Grid item>
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              type="file"
              onChange={(e) => {
                setUploadFile(e.target.files[0])
                setAvatarSrc(URL.createObjectURL(e.target.files[0]))
              }}
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span">
                Update profile picture
              </Button>
              <Button disabled>Select</Button>
            </label>
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Typography className="text-center" variant="caption">
            Size should be less than 2 mb
          </Typography>
        </Grid>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="mr-3"
          variant="contained"
          color="secondary"
          onClick={onHide}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          onClick={handleSubmitBtn}
          variant="contained"
          color="primary"
          disabled={loading ? true : false}
        >
          {loading ? "Updating..." : "Update"}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
