import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core"
import React, { useState } from "react"
import { useContext } from "react"
import { UserContext } from "../../../../context/userContext/UserContext"
import { FriendCard } from "./FriendCard"
import { FriendsLoading } from "./FriendsLoading"

export const FriendsTab = () => {
  const [tab, setTab] = useState(false)
  const userContext = useContext(UserContext)

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
              <Button fullWidth>Friend requests</Button>
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth>My Friends</Button>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              {userContext.friends === null ? (
                <FriendsLoading />
              ) : tab ? null : (
                userContext.friends.map((friend) => {
                  return <FriendCard friend={friend} />
                })
              )}
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </div>
  )
}
