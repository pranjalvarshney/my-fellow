import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@material-ui/core"
import React from "react"
import PeopleAltRoundedIcon from "@material-ui/icons/PeopleAltRounded"
import SupervisedUserCircleRoundedIcon from "@material-ui/icons/SupervisedUserCircleRounded"
import BookmarksRoundedIcon from "@material-ui/icons/BookmarksRounded"
import EventNoteRoundedIcon from "@material-ui/icons/EventNoteRounded"

export const HomeSideBar = () => {
  return (
    <div>
      <Paper>
        <List component="nav">
          <ListItem button>
            <ListItemIcon>
              <Avatar />
            </ListItemIcon>
            <ListItemText
              primary="Username"
              secondary="Student | School of Information and communicaton Technology"
            />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <PeopleAltRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Friends" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <SupervisedUserCircleRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Groups" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <EventNoteRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Events" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <BookmarksRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Notices" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <BookmarksRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Bookmarks" />
          </ListItem>
        </List>
      </Paper>
    </div>
  )
}
