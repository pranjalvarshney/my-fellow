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
import React, { useContext, useState } from "react"
import FavoriteIcon from "@material-ui/icons/Favorite"
import ShareIcon from "@material-ui/icons/Share"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import Moment from "react-moment"
import { AuthContext } from "../../../../context/authContext/authContext"
import { PostContext } from "../../../../context/postContext/postContext"

export const PostCard = ({ post }) => {
  const authContext = useContext(AuthContext)
  const postContext = useContext(PostContext)
  const [moreOption, setMoreOption] = useState(null)
  const handleMoreOption = (e) => {
    setMoreOption(e.currentTarget)
  }
  const open = Boolean(moreOption)
  const handleClose = () => {
    setMoreOption(null)
  }

  return (
    <Card variant="outlined" className="mb-3">
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
                <MenuItem
                  onClick={() => {
                    // postContext.updatePost(formData,authContext.user._id, post._id)
                    // handleClose()
                  }}
                >
                  Edit
                </MenuItem>
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
        <Typography variant="body2" component="p">
          {post.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className="py-1">
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
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
