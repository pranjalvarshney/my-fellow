import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  Avatar,
  Button,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core"
import React from "react"

export const FriendsTab = () => {
  return (
    <div className="friends-tab">
      <Paper variant="outlined" className="py-3">
        <Container>
          <Grid container justify="space-between">
            <Grid item xs={6}>
              <Typography variant="h5" gutterBottom>
                <b>Friends</b>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Grid
                container
                spacing={1}
                justify="flex-end"
                alignItems="flex-end"
              >
                <Grid item>
                  <TextField placeholder="Search name..." />
                </Grid>
                <Grid item>
                  <FontAwesomeIcon icon={faSearch} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container justify="space-between">
            <Grid item xs={6}>
              <Button fullWidth>My Friends</Button>
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth>Friend requests</Button>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
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
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </div>
  )
}
