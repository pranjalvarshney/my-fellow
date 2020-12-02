import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@material-ui/core"
import React from "react"
import FavoriteIcon from "@material-ui/icons/Favorite"
import ShareIcon from "@material-ui/icons/Share"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import Moment from "react-moment"

export const PostCard = ({ post }) => {
  return (
    <Card variant="outlined" className="mb-3">
      <CardHeader
        avatar={<Avatar aria-label="recipe">R</Avatar>}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post.user.name}
        subheader={<Moment fromNow>{post.createdAt}</Moment>}
      />

      {post.picture.length > 0 && (
        <img width="100%" src={`${post.picture[0]}`} alt={post.picture[0]} />
      )}
      <CardContent className="py-1">
        <Typography variant="body2" color="textSecondary" component="p">
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
