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
import { Home } from "../../../common/Base/Home"
import { InputBox } from "../InputBox"

export const Post = () => {
  return (
    <Home>
      <div id="post-wrapper" className="px-2">
        <InputBox />
        <Card variant="outlined">
          <CardHeader
            avatar={<Avatar aria-label="recipe">R</Avatar>}
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
          />
          <img
            width="100%"
            src="https://www.healthyfanz.com/wp-content/uploads/2020/01/Jalebi-Recipe-Sweet-Dish.jpg"
            alt="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              This impressive paella is a perfect party dish and a fun meal to
              cook together with your guests. Add 1 cup of frozen peas along
              with the mussels, if you like.
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
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
      </div>
    </Home>
  )
}
