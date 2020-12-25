import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core"
import React, { useContext } from "react"
import { AuthContext } from "../../../context/authContext/authContext"
import PeopleAltRoundedIcon from "@material-ui/icons/PeopleAltRounded"
import SupervisedUserCircleRoundedIcon from "@material-ui/icons/SupervisedUserCircleRounded"
import BookmarksRoundedIcon from "@material-ui/icons/BookmarksRounded"
import EventNoteRoundedIcon from "@material-ui/icons/EventNoteRounded"
import { useHistory } from "react-router-dom"
import { Notice } from "./Notice/Notice"

export const HomeSideBar = () => {
  const authContext = useContext(AuthContext)
  const history = useHistory()
  return (
    <div>
      <Paper variant="outlined">
        <List component="nav">
          <ListItem
            button
            onClick={() => {
              history.push(`/profile/${authContext.user._id}`)
            }}
          >
            <ListItemIcon>
              <Avatar style={{ height: "50px", width: "50px" }} />
            </ListItemIcon>
            <ListItemText
              primary={<b>{authContext.user.name}</b>}
              secondary="Student | School of Information and communicaton Technology"
            />
          </ListItem>
          <Divider />
          <ListItem
            button
            onClick={() => {
              history.push("friends")
            }}
          >
            <ListItemIcon>
              <PeopleAltRoundedIcon />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="button">Friends</Typography>}
            />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <SupervisedUserCircleRoundedIcon />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="button">Groups</Typography>}
            />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <EventNoteRoundedIcon />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="button">Events</Typography>}
            />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <BookmarksRoundedIcon />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="button">Notices</Typography>}
            />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              history.push(`/bookmarks`)
            }}
          >
            <ListItemIcon>
              <BookmarksRoundedIcon />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="button">Bookmarks</Typography>}
            />
          </ListItem>
        </List>
      </Paper>
      <Notice />
    </div>
  )
}
