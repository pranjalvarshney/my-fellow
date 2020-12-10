import {
  faComment,
  faArrowAltCircleUp as faArrowAltCircleUpRegular,
  faBookmark as faBookmarkRegular,
} from "@fortawesome/free-regular-svg-icons"
import { faShare } from "@fortawesome/free-solid-svg-icons"
import {
  faArrowAltCircleUp as faArrowAltCircleUpSolid,
  faBookmark as faBookmarkSolid,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Fade,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core"
import React, { useContext, useEffect, useState } from "react"
import Moment from "react-moment"
import MoreHorizIcon from "@material-ui/icons/MoreHoriz"
import { AuthContext } from "../../../../context/authContext/authContext"
import { BlogContext } from "../../../../context/blogContext/BlogContext"
import { BlogModal } from "../../Modals/BlogModal"

export const BlogCard = ({ blog }) => {
  const authContext = useContext(AuthContext)
  const blogContext = useContext(BlogContext)
  const [vote, setVote] = useState(false)

  const [countVote, setCountVote] = useState(blog.upvotes.length)
  const [moreOption, setMoreOption] = useState(null)
  const handleMoreOption = (e) => {
    setMoreOption(e.currentTarget)
  }
  const [bookmarkStatus, setBookmarkStatus] = useState(false)

  useEffect(() => {
    blog.upvotes.filter((likeId) => {
      if (likeId === authContext.user._id) {
        setVote(true)
      } else {
        setVote(false)
      }
      return 0
    })
  }, [authContext.user._id, blog.upvotes])
  const handleVote = () => {
    if (!vote) {
      blogContext.upVoteBlog(blog._id, authContext.user._id)
      setCountVote(countVote + 1)
      setVote(true)
    } else {
      blogContext.downVoteBlog(blog._id, authContext.user._id)
      setCountVote(countVote - 1)
      setVote(false)
    }
  }
  const handleBookmarkBtn = () => {
    setBookmarkStatus(!bookmarkStatus)
  }

  const open = Boolean(moreOption)
  const handleClose = () => {
    setMoreOption(null)
  }
  const [showBlog, setShowBlog] = useState(false)

  const handleModalBlog = () => {
    handleClose()
    setShowBlog(!showBlog)
  }
  return (
    <>
      {showBlog && (
        <BlogModal
          show={showBlog}
          handleModal={handleModalBlog}
          blogFunction={blogContext.updateBlog}
          modalTitle="Update blog"
          blog={blog}
        />
      )}
      <Card variant="outlined" className="mb-3">
        <CardHeader
          className="pt-3 pb-0"
          avatar={<Avatar aria-label="recipe">R</Avatar>}
          action={
            <>
              <IconButton aria-label="settings" onClick={handleMoreOption}>
                <MoreHorizIcon />
              </IconButton>
              <Menu
                id="fade-menu"
                anchorEl={moreOption}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                {authContext.user._id === blog.user._id ? (
                  <MenuItem onClick={handleModalBlog}>Edit</MenuItem>
                ) : null}
                {authContext.user._id === blog.user._id ? (
                  <MenuItem
                    onClick={() => {
                      blogContext.deleteBlog(authContext.user._id, blog._id)
                      handleClose()
                    }}
                  >
                    Delete
                  </MenuItem>
                ) : null}
                <MenuItem onClick={handleClose}>Share</MenuItem>
                <MenuItem onClick={handleClose}>Bookmark</MenuItem>

                <MenuItem onClick={handleClose}>Report Post</MenuItem>
              </Menu>
            </>
          }
          title={blog.user.name}
          subheader={<Moment fromNow>{blog.createdAt}</Moment>}
        />

        <CardContent>
          <Typography variant="subtitle2" component="p">
            <b>{blog.title}</b>
          </Typography>
          <Typography variant="subtitle2" component="p">
            {blog.content}
          </Typography>
        </CardContent>
        {blog.picture && (
          <img width="100%" src={blog.picture} alt={blog.picture} />
        )}
        <CardActions disableSpacing>
          <Grid container justify="space-between">
            <Grid item>
              <IconButton onClick={handleVote}>
                {vote ? (
                  <FontAwesomeIcon
                    icon={faArrowAltCircleUpSolid}
                    style={{ color: `blue` }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faArrowAltCircleUpRegular}
                    style={{ color: `grey` }}
                  />
                )}
              </IconButton>
              <span>
                <Typography variant="overline">{countVote}</Typography>
              </span>
              <IconButton>
                <FontAwesomeIcon icon={faComment} />
              </IconButton>
              <span>
                <Typography variant="overline">
                  {blog.comments.length}
                </Typography>
              </span>
              <IconButton>
                <FontAwesomeIcon icon={faShare} />
              </IconButton>
              <span>
                <Typography variant="overline">
                  {blog.comments.length}
                </Typography>
              </span>
            </Grid>
            <Grid item>
              <IconButton onClick={handleBookmarkBtn}>
                {bookmarkStatus ? (
                  <FontAwesomeIcon icon={faBookmarkSolid} />
                ) : (
                  <FontAwesomeIcon icon={faBookmarkRegular} />
                )}
              </IconButton>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </>
  )
}
