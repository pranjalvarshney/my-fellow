import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Fade,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core"
import React, { useContext, useEffect, useState } from "react"
import FavoriteIcon from "@material-ui/icons/Favorite"
import ShareIcon from "@material-ui/icons/Share"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import Moment from "react-moment"
import { AuthContext } from "../../../../context/authContext/authContext"
import { PostContext } from "../../../../context/postContext/postContext"
import { PostModal } from "../../Modals/PostModal"

export const PostCard = ({ post }) => {
  const authContext = useContext(AuthContext)
  const postContext = useContext(PostContext)
  const [likeStatus, setLikeStatus] = useState(false)

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
    // console.log(showPost)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLikeBtn = () => {
    if (!likeStatus) {
      postContext.unLikePost(post._id, authContext.user._id)
      setLikeStatus(true)
    } else {
      postContext.likePost(post._id, authContext.user._id)
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
      <CardActions disableSpacing className="py-1">
        <span>
          <IconButton onClick={handleLikeBtn}>
            <FavoriteIcon color={likeStatus ? "secondary" : "primary"} />
          </IconButton>
          {post.likes.length}
        </span>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="show more">
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}
