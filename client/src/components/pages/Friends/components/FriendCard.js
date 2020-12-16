import {
  Avatar,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@material-ui/core"
import React from "react"

export const FriendCard = () => {
  return (
    <List>
      <ListItem button>
        <ListItemAvatar>
          <IconButton>
            <Avatar />
          </IconButton>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography variant="h6">
              <b>Friend name</b>
            </Typography>
          }
          secondary={
            <Typography variant="subtitle2" className="">
              Student - Computer Science
            </Typography>
          }
        />
        <Button
          onClick={(e) => {
            e.preventDefault()
          }}
        >
          Accept
        </Button>
        <Button>Delete</Button>
      </ListItem>
    </List>
  )
}
