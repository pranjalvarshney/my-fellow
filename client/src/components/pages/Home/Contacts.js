import React from "react"
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search"

export const Contacts = () => {
  return (
    <Card variant="outlined" className="mt-3">
      <CardContent>
        <Grid container direction="row" justify="space-between">
          <Grid item>
            <Typography variant="h6">Contacts</Typography>
          </Grid>
          <Grid>
            <IconButton size="small">
              <SearchIcon />
            </IconButton>
          </Grid>
        </Grid>
        <List component="nav">
          <ListItem button>
            <ListItemIcon>
              <Avatar />
            </ListItemIcon>
            <ListItemText primary="Friends" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Avatar />
            </ListItemIcon>
            <ListItemText primary="Friends" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Avatar />
            </ListItemIcon>
            <ListItemText primary="Friends" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Avatar />
            </ListItemIcon>
            <ListItemText primary="Friends" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Avatar />
            </ListItemIcon>
            <ListItemText primary="Friends" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Avatar />
            </ListItemIcon>
            <ListItemText primary="Friends" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Avatar />
            </ListItemIcon>
            <ListItemText primary="Friends" />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  )
}
