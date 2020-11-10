import {
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@material-ui/core"
import React from "react"

export const HomeSideBar = () => {
  return (
    <div>
      <Paper>
        <List component="nav">
          <ListItem button>
            <ListItemIcon>
              <Avatar />
            </ListItemIcon>
            <ListItemText primary="Username" />
          </ListItem>
        </List>
      </Paper>
    </div>
  )
}
