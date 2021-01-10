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
import { PollModal } from "../Modals/PollModal"
import { API } from "../../../utils/proxy"
import { PollContext } from "../../../context/pollContext/PollContext"
import { AdsContext } from "../../../context/adsContext/AdsContext"
import { AdsModal } from "../Modals/AdsModal"

export const InputBox = () => {
  const authContext = useContext(AuthContext)
  const postContext = useContext(PostContext)
  const blogContext = useContext(BlogContext)
  const pollContext = useContext(PollContext)
  const adsContext = useContext(AdsContext)
  const [showPost, setShowPost] = useState(false)
  const [showBlog, setShowBlog] = useState(false)
  const [showPoll, setShowPoll] = useState(false)
  const [showAds, setShowAds] = useState(false)
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
  const handleModalAds = () => {
    // console.log(showBlog)
    setShowAds(!showAds)
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
      {showAds && (
        <AdsModal
          modalTitle="Create ads"
          show={showAds}
          adsFunction={adsContext.createAds}
          ads={undefined}
          handleModal={handleModalAds}
        />
      )}
      {showPoll && (
        <PollModal
          modalTitle="Create poll"
          show={showPoll}
          pollFunction={pollContext.createPoll}
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
            <Button onClick={handleModalAds} startIcon={<BrokenImageIcon />}>
              Post Ad
            </Button>
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
