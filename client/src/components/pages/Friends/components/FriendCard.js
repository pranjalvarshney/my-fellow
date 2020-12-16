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

export const FriendCard = ({ friend, type }) => {
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
              <b>{friend.name}</b>
            </Typography>
          }
          secondary={
            <Typography variant="subtitle2" className="">
              {friend.bio}
            </Typography>
          }
        />
        {type === "request" && (
          <>
            <Button>Accept</Button>
            <Button>Delete</Button>
          </>
        )}
        {type === "friend" && (
          <>
            <Button>Unfriend</Button>
          </>
        )}

        {type === "not-friend" && (
          <>
            <Button>Add friend</Button>
          </>
        )}
      </ListItem>
    </List>
  )
}
