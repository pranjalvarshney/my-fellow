import { Fab, Grid, Button, Paper, Avatar } from "@material-ui/core"
import React, { useContext, useState } from "react"
import { AuthContext } from "../../../context/authContext/authContext"
import BrokenImageIcon from "@material-ui/icons/BrokenImage"
import PollIcon from "@material-ui/icons/Poll"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faFeather } from "@fortawesome/free-solid-svg-icons"
import { PostModal } from "../Modals/PostModal"
import { PostContext } from "../../../context/postContext/postContext"
import { BlogModal } from "../Modals/BlogModal"
import { BlogContext } from "../../../context/blogContext/BlogContext"
import { PollCard } from "./PollCard"
import { PollModal } from "../Modals/PollModal"
import { API } from "../../../utils/proxy"

export const InputBox = () => {
  const authContext = useContext(AuthContext)
  const postContext = useContext(PostContext)
  const blogContext = useContext(BlogContext)
  const [showPost, setShowPost] = useState(false)
  const [showBlog, setShowBlog] = useState(false)
  const [showPoll, setShowPoll] = useState(false)
  const handleModalPoll = () => {
    setShowPoll(!showPoll)
  }
  const handleModalPost = () => {
    // console.log(showPost)
    setShowPost(!showPost)
  }
  const handleModalBlog = () => {
    // console.log(showBlog)
    setShowBlog(!showBlog)
  }

  return (
    <>
      {showPost && (
        <PostModal
          show={showPost}
          handleModal={handleModalPost}
          postFunction={postContext.createPost}
          modalTitle="Create post"
          post={undefined}
        />
      )}
      {showBlog && (
        <BlogModal
          show={showBlog}
          handleModal={handleModalBlog}
          blogFunction={blogContext.createBlog}
          modalTitle="Write Blog"
          blog={undefined}
        />
      )}
      {showPoll && (
        <PollModal
          modalTitle="Create poll"
          show={showPoll}
          poll={undefined}
          handleModal={handleModalPoll}
        />
      )}
      <Paper elevation={3} variant="elevation" className="p-3 mb-3">
        <Grid
          container
          justify="center"
          direction="row"
          spacing={6}
          alignItems="center"
        >
          <Grid item xs={1}>
            <Avatar
              alt={authContext.user.name}
              src={`${API}/pic/user/${authContext.user._id}`}
            />
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
            <Button
              onClick={handleModalBlog}
              startIcon={<FontAwesomeIcon icon={faFeather} />}
            >
              Write Blog
            </Button>
          </Grid>
          <Grid item>
            <Button startIcon={<BrokenImageIcon />}>Post Ad</Button>
          </Grid>
          <Grid item>
            <Button onClick={handleModalPoll} startIcon={<PollIcon />}>
              Poll
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}
