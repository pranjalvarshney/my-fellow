import {
  faComment,
  faArrowAltCircleUp as faArrowAltCircleUpRegular,
  faBookmark as faBookmarkRegular,
  faPaperPlane,
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
  Collapse,
  Fade,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
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
import { useHistory } from "react-router-dom"

export const BlogCard = ({ blog }) => {
  const history = useHistory()
  const authContext = useContext(AuthContext)
  const blogContext = useContext(BlogContext)
  const [vote, setVote] = useState(false)
  const [comment, setComment] = useState("")
  const [shareCount, setShareCount] = useState(blog.shareCount)
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
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const handleCommentSend = async () => {
    await blogContext.addComment(blog._id, authContext.user._id, comment)
  }

  const handleShareBtn = async () => {
    const response = await blogContext.countShare(blog._id)
    setShareCount(response.shareCount)
    console.log(response)
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

                <MenuItem onClick={handleClose}>Report blog</MenuItem>
              </Menu>
            </>
          }
          title={
            <b
              onClick={() => {
                history.push(`/profile/${blog.user._id}`)
              }}
            >
              {blog.user.name}
            </b>
          }
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
              <IconButton onClick={handleExpandClick}>
                <FontAwesomeIcon icon={faComment} />
              </IconButton>
              <span>
                <Typography variant="overline">
                  {blog.comments.length}
                </Typography>
              </span>
              <IconButton onClick={handleShareBtn}>
                <FontAwesomeIcon icon={faShare} />
              </IconButton>
              <span>
                <Typography variant="overline">{shareCount}</Typography>
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
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Grid container direction="column">
              <Grid item>
                {blog.comments.map((comment) => {
                  return (
                    <span style={{ display: "flex" }} key={comment._id}>
                      <Typography variant="body2" className="pr-3">
                        <b>{comment.user.name}</b>
                      </Typography>
                      <Typography variant="subtitle2">
                        {comment.text}
                      </Typography>
                    </span>
                  )
                })}
              </Grid>
              <Grid item>
                <FormControl fullWidth size="small">
                  <InputLabel>Add a comment...</InputLabel>
                  <Input
                    value={comment}
                    onChange={(e) => {
                      setComment(e.target.value)
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton type="submit" onClick={handleCommentSend}>
                          <FontAwesomeIcon icon={faPaperPlane} />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Collapse>
      </Card>
    </>
  )
}
