import {
  faComment,
  faArrowAltCircleUp as faArrowAltCircleUpRegular,
} from "@fortawesome/free-regular-svg-icons"
import { faShare } from "@fortawesome/free-solid-svg-icons"
import {
  faEllipsisH,
  faArrowAltCircleUp as faArrowAltCircleUpSolid,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
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
import Moment from "react-moment"
import MoreHorizIcon from "@material-ui/icons/MoreHoriz"
import { AuthContext } from "../../../../context/authContext/authContext"
import { BlogContext } from "../../../../context/blogContext/BlogContext"

export const BlogCard = ({ blog }) => {
  const authContext = useContext(AuthContext)
  const blogContext = useContext(BlogContext)
  const [moreOption, setMoreOption] = useState(null)
  const handleMoreOption = (e) => {
    setMoreOption(e.currentTarget)
  }
  const open = Boolean(moreOption)
  const handleClose = () => {
    setMoreOption(null)
  }
  const [showPost, setShowPost] = useState(false)

  const handleModalPost = () => {
    handleClose()
    setShowPost(!showPost)
  }
  return (
    <div>
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
                  <MenuItem onClick={handleModalPost}>Edit</MenuItem>
                ) : null}
                {authContext.user._id === blog.user._id ? (
                  <MenuItem
                    onClick={() => {
                      blogContext.deletePost(authContext.user._id, blog._id)
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
          <Typography variant="body2" component="p">
            {blog.content}
          </Typography>
        </CardContent>
        {blog.picture.length > 0 && (
          <img width="100%" src={blog.picture} alt={blog.picture[0]} />
        )}
        <CardActions disableSpacing>
          <IconButton>
            <FontAwesomeIcon icon={faArrowAltCircleUpRegular} />
          </IconButton>
          <IconButton>
            <FontAwesomeIcon icon={faComment} />
          </IconButton>
          <IconButton>
            <FontAwesomeIcon icon={faShare} />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  )
}
