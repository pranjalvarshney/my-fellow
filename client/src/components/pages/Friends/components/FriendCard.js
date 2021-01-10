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
import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../../context/userContext/UserContext"
import { AuthContext } from "../../../../context/authContext/authContext"
import { ButtonLoading } from "../../../Loading_Backdrop/ButtonLoading"
import { API } from "../../../../utils/proxy"

export const FriendCard = ({ friend, type }) => {
  const userContext = useContext(UserContext)
  const authContext = useContext(AuthContext)
  const [loading, setLoading] = useState(userContext.loading)
  const handleClickBtn = async (e, func) => {
    try {
      await func(authContext.user._id, friend._id)
    } catch (error) {}
  }
  useEffect(() => {
    setLoading(userContext.loading)
  }, [userContext.loading])
  return (
    <List>
      <ListItem>
        <ListItemAvatar>
          <IconButton>
            <Avatar alt={friend.name} src={`${API}/pic/user/${friend._id}`} />
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
              {authContext.user.role === 0 && "Student"}
              {authContext.user.role === 1 && "Faculty"}
              {authContext.user.role === 2 && "Admin"}
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
              {loading ? <ButtonLoading /> : "Accept"}
              {/* Accept */}
            </Button>
            <Button
              onClick={(e) =>
                handleClickBtn(e, userContext.rejectFriendRequest)
              }
            >
              {loading ? <ButtonLoading /> : "Delete"}
              {/* Delete */}
            </Button>
          </>
        )}
        {type === "friend" && (
          <>
            <Button onClick={(e) => handleClickBtn(e, userContext.unFriend)}>
              {loading ? <ButtonLoading /> : "Remove fellow"}
              {/* Unfriend */}
            </Button>
          </>
        )}

        {type === "not-friend" && (
          <>
            <Button
              onClick={(e) => handleClickBtn(e, userContext.sendFriendRequest)}
            >
              {loading ? <ButtonLoading /> : "Add fellow"}
              {/* Add friend */}
            </Button>
          </>
        )}
      </ListItem>
    </List>
  )
}
