import { Fab, Grid, Button, Paper, Avatar } from "@material-ui/core"
import React, { useContext, useState } from "react"
import { AuthContext } from "../../../context/authContext/authContext"
import BrokenImageIcon from "@material-ui/icons/BrokenImage"
import PollIcon from "@material-ui/icons/Poll"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faFeather } from "@fortawesome/free-solid-svg-icons"
import { PostModal } from "../Modals/PostModal"
import { PostContext } from "../../../context/postContext/postContext"

export const InputBox = () => {
  const authContext = useContext(AuthContext)
  const postContext = useContext(PostContext)
  const [showPost, setShow] = useState(false)

  const handleModalPost = () => {
    // console.log(showPost)
    setShow(!showPost)
  }

  return (
    <>
      {showPost && (
        <PostModal
          show={showPost}
          handleModal={handleModalPost}
          postFunction={postContext.createPost}
          title="Create post"
          post={undefined}
        />
      )}
      <Paper elevation={1} variant="outlined" className="p-3 mb-3">
        <Grid
          container
          justify="center"
          direction="row"
          spacing={6}
          alignItems="center"
        >
          <Grid item xs={1}>
            <Avatar />
          </Grid>
          <Grid item xs={10}>
            <Fab
              variant="extended"
              disabled
              style={{ width: "100%" }}
              size="medium"
            >
              {`What's on your mind? ${authContext.user.name}`}
            </Fab>
          </Grid>
        </Grid>

        <Grid
          container
          justify="space-around"
          alignItems="center"
          className="pt-2"
        >
          <Grid item>
            <Button
              onClick={handleModalPost}
              startIcon={<FontAwesomeIcon icon={faEdit} />}
            >
              Create Post
            </Button>
          </Grid>
          <Grid item>
            <Button startIcon={<FontAwesomeIcon icon={faFeather} />}>
              Write Blog
            </Button>
          </Grid>
          <Grid item>
            <Button startIcon={<BrokenImageIcon />}>Post Ad</Button>
          </Grid>
          <Grid item>
            <Button startIcon={<PollIcon />}>Poll</Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}
