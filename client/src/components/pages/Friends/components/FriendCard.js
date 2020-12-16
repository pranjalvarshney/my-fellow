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
import React, { useContext } from "react"
import { UserContext } from "../../../../context/userContext/UserContext"
import { AuthContext } from "../../../../context/authContext/authContext"

export const FriendCard = ({ friend, type }) => {
  const userContext = useContext(UserContext)
  const authContext = useContext(AuthContext)
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
            <Button
              onClick={() => {
                userContext.sendFriendRequest(authContext.user._id, friend._id)
              }}
            >
              Add friend
            </Button>
          </>
        )}
      </ListItem>
    </List>
  )
}
