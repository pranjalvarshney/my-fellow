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
import MoreVertIcon from "@material-ui/icons/MoreVert"
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

export const PostCard = ({ post }) => {
  const authContext = useContext(AuthContext)
  const postContext = useContext(PostContext)
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
  const [showPost, setShow] = useState(false)

  const handleModalPost = () => {
    handleClose()
    setShow(!showPost)
  }
  useEffect(() => {
    post.likes.filter((like) => {
      if (like === authContext.user._id) {
        setLikeStatus(true)
      } else {
        setLikeStatus(false)
      }

      return 0
    })
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

  return (
    <Card variant="outlined" className="mb-3">
      {showPost && (
        <PostModal
          show={showPost}
          handleModal={handleModalPost}
          postFunction={postContext.updatePost}
          title="Update post"
          post={post}
        />
      )}
      <CardHeader
        avatar={<Avatar aria-label="recipe">R</Avatar>}
        action={
          <>
            <IconButton aria-label="settings" onClick={handleMoreOption}>
              <MoreVertIcon />
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
        title={post.user.name}
        subheader={<Moment fromNow>{post.createdAt}</Moment>}
      />

      {post.picture.length > 0 && (
        <img width="100%" src={`${post.picture[0]}`} alt={post.picture[0]} />
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
                <FontAwesomeIcon
                  icon={faHeartRegualar}
                  style={{ color: "grey" }}
                />
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
            <IconButton>
              <FontAwesomeIcon icon={faBookmarkRegular} />
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
                  id="standard-adornment-password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton>
                        <FontAwesomeIcon icon={faPaperPlane} />
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
