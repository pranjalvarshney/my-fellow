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
import React, { useContext, useState } from "react"
import { UserContext } from "../../../../context/userContext/UserContext"
import { AuthContext } from "../../../../context/authContext/authContext"
import { ButtonLoading } from "../../../Loading_Backdrop/ButtonLoading"

export const FriendCard = ({ friend, type }) => {
  const userContext = useContext(UserContext)
  const authContext = useContext(AuthContext)
  // const [loading, setLoading] = useState(userContext.loading)
  const handleClickBtn = async (e, func) => {
    try {
      await func(authContext.user._id, friend._id)
      // setLoading(userContext.loading)
    } catch (error) {}
  }
  return (
    <List>
      <ListItem>
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
            <Button
              onClick={(e) =>
                handleClickBtn(e, userContext.acceptFriendRequest)
              }
            >
              Accept
            </Button>
            <Button
              onClick={(e) =>
                handleClickBtn(e, userContext.rejectFriendRequest)
              }
            >
              Delete
            </Button>
          </>
        )}
        {type === "friend" && (
          <>
            <Button onClick={(e) => handleClickBtn(e, userContext.unFriend)}>
              Unfriend
            </Button>
          </>
        )}

        {type === "not-friend" && (
          <>
            <Button
              onClick={(e) => handleClickBtn(e, userContext.sendFriendRequest)}
            >
              {/* {loading ? <ButtonLoading /> : "Add friend"} */}
              Add friend
            </Button>
          </>
        )}
      </ListItem>
    </List>
  )
}
