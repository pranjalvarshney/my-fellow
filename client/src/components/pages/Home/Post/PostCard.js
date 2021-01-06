import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
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
import MoreHorizIcon from "@material-ui/icons/MoreHoriz"
import Moment from "react-moment"
import { AuthContext } from "../../../../context/authContext/authContext"
import { PostContext } from "../../../../context/postContext/postContext"
import { PostModal } from "../../Modals/PostModal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faComment,
  faHeart as faHeartRegualar,
  faShareSquare,
  faBookmark as faBookmarkRegular,
} from "@fortawesome/free-regular-svg-icons"
import {
  faHeart as faHeartSolid,
  faBookmark as faBookmarkSolid,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons"
import { useHistory } from "react-router-dom"
import { UserContext } from "../../../../context/userContext/UserContext"
import { API } from "../../../../utils/proxy"

export const PostCard = ({ post }) => {
  const history = useHistory()
  const authContext = useContext(AuthContext)
  const userContext = useContext(UserContext)
  const postContext = useContext(PostContext)
  const [bookmarkStatus, setBookmarkStatus] = useState(false)
  const [comment, setComment] = useState("")
  // const [bookmark, setBookmark] = useState("")
  const [likeStatus, setLikeStatus] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes.length)
  const [moreOption, setMoreOption] = useState(null)
  const handleMoreOption = (e) => {
    setMoreOption(e.currentTarget)
  }
  const open = Boolean(moreOption)
  const handleClose = () => {
    setMoreOption(null)
  }
  const [sendBtnColor, setSendBtnColor] = useState("grey")

  const [showPost, setShowPost] = useState(false)

  const handleModalPost = () => {
    handleClose()
    setShowPost(!showPost)
  }
  useEffect(() => {
    if (!userContext.loading) {
      // console.log(userContext.user.bookmark.post)
      userContext.user.bookmark.post.forEach((element) => {
        if (element._id === post._id) {
          setBookmarkStatus(true)
        }
      })
      // if (userContext.user.bookmark.post.includes(post._id)) {
      //   setBookmarkStatus(true)
      // } else {
      //   setBookmarkStatus(false)
      // }
      // userContext.user.bookmark.post.map((item) => {
      //   if (item._id === post._id) {
      //     setBookmarkStatus(true)
      //   } else {
      //     setBookmarkStatus(false)
      //   }
      //   return 0
      // })
    }
  }, [post._id, userContext.loading, userContext.user.bookmark.post])
  useEffect(() => {
    // post.likes.filter((like) => {
    //   if (like === authContext.user._id) {
    //     setLikeStatus(true)
    //   } else {
    //     setLikeStatus(false)
    //   }
    if (post.likes.includes(authContext.user._id)) {
      setLikeStatus(true)
    } else {
      setLikeStatus(false)
    }
  }, [authContext.user._id, post.likes])

  const handleLikeBtn = () => {
    if (!likeStatus) {
      postContext.likePost(post._id, authContext.user._id)
      setLikeCount(likeCount + 1)
      setLikeStatus(true)
    } else {
      postContext.unLikePost(post._id, authContext.user._id)
      setLikeCount(likeCount - 1)
      setLikeStatus(false)
    }
  }
  const handleBookmarkBtn = () => {
    const formData = {
      type: post.objType,
      typeId: post._id,
    }
    if (!bookmarkStatus) {
      userContext.bookmarkItem(authContext.user._id, formData)
      setBookmarkStatus(true)
    } else {
      userContext.unBookmarkItem(authContext.user._id, formData)
      setBookmarkStatus(false)
    }
  }
  const handleCommentSend = async () => {
    await postContext.addComment(post._id, authContext.user._id, comment)
  }
  return (
    <Card variant="elevation" elevation={3} className="mb-3">
      {showPost && (
        <PostModal
          show={showPost}
          handleModal={handleModalPost}
          postFunction={postContext.updatePost}
          modalTitle="Update post"
          post={post}
        />
      )}
      <CardHeader
        avatar={
          <Avatar
            alt={post.user.name}
            src={`${API}/pic/user/${post.user._id}`}
          />
        }
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
              {authContext.user._id === post.user._id ? (
                <MenuItem onClick={handleModalPost}>Edit</MenuItem>
              ) : null}
              {authContext.user._id === post.user._id ? (
                <MenuItem
                  onClick={() => {
                    postContext.deletePost(authContext.user._id, post._id)
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
        title={
          <b
            style={{ cursor: "pointer" }}
            onClick={() => {
              history.push(`/profile/${post.user._id}`)
            }}
          >
            {post.user.name}
          </b>
        }
        subheader={<Moment fromNow>{post.createdAt}</Moment>}
      />

      {post.picture.length > 0 && (
        <img width="100%" src={`/${post.picture[0]}`} alt={post.picture[0]} />
      )}
      <CardContent className="py-1">
        <Typography variant="body1" component="p">
          {post.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className="my-0 py-0">
        <Grid container justify="space-between">
          <Grid item>
            <IconButton onClick={handleLikeBtn}>
              {likeStatus ? (
                <FontAwesomeIcon
                  icon={faHeartSolid}
                  style={{ color: "#ed4c56" }}
                />
              ) : (
                <FontAwesomeIcon icon={faHeartRegualar} />
              )}
            </IconButton>
            <IconButton>
              <FontAwesomeIcon icon={faComment} />
            </IconButton>
            <IconButton>
              <FontAwesomeIcon icon={faShareSquare} />
            </IconButton>
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
      <Accordion variant="elevation">
        <AccordionSummary>
          <Grid container justify="space-between">
            <Grid item>
              <Typography
                onClick={(event) => event.stopPropagation()}
                onFocus={(event) => event.stopPropagation()}
                variant="subtitle2"
                gutterBottom
              >
                {`Liked by ${likeCount}`}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2">{`View all ${post.comments.length} comments`}</Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container direction="column">
            <Grid item>
              {post.comments.map((comment) => {
                return (
                  <span style={{ display: "flex" }} key={comment._id}>
                    <Typography variant="body2" className="pr-3">
                      <b>{comment.user.name}</b>
                    </Typography>
                    <Typography variant="subtitle2">{comment.text}</Typography>
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
                    if (e.target.value === "") {
                      setSendBtnColor("grey")
                      console.log(e.target.value)
                    } else {
                      setSendBtnColor("white")
                      console.log(e.target.value)
                    }
                    setComment(e.target.value)
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton type="submit" onClick={handleCommentSend}>
                        <FontAwesomeIcon
                          color={sendBtnColor}
                          size="sm"
                          icon={faPaperPlane}
                        />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Card>
  )
}
