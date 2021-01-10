// import { faGrinWink } from "@fortawesome/free-regular-svg-icons"
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
import { useEffect } from "react"
import { useContext } from "react"
import { UserContext } from "../../../../context/userContext/UserContext"
import { FriendCard } from "./FriendCard"
import { FriendsLoading } from "./FriendsLoading"

export const FriendsTab = () => {
  const [tab, setTab] = useState(true)
  const userContext = useContext(UserContext)

  const showReqsTab = () => {
    setTab(true)
  }

  const showFriendsTab = () => {
    setTab(false)
  }
  const [allUsers, setAllUsers] = useState([])
  function comparer(otherArray) {
    return function (current) {
      return (
        otherArray.filter(function (other) {
          return other._id === current._id
        }).length === 0
      )
    }
  }
  useEffect(() => {
    if (userContext.user === null) {
      return <FriendsLoading />
    } else {
      let arr = []

      userContext.user.friendList.map((u) => arr.push(u))
      userContext.user.sentReqs.map((u) => arr.push(u))
      userContext.user.receivedReqs.map((u) => arr.push(u))
      arr.push(userContext.user)
      const a = userContext.all
      console.log(userContext.all)
      console.log(arr)
      let res = a.filter(comparer(arr))
      setAllUsers(res)
    }
  }, [userContext.all, userContext.loading, userContext.user])

  return (
    <div className="friends-tab">
      <Paper variant="outlined" className="py-3">
        <Container>
          <Grid container justify="space-between">
            <Grid item xs={6}>
              <Typography variant="h5" gutterBottom>
                <b>Fellows</b>
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
              <Button
                fullWidth
                onClick={showReqsTab}
                color={`${tab ? "primary" : "default"}`}
                style={tab ? { fontWeight: "bold" } : { fontWeight: "normal" }}
              >
                Fellow requests
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                onClick={showFriendsTab}
                color={`${!tab ? "primary" : "default"}`}
                style={!tab ? { fontWeight: "bold" } : { fontWeight: "normal" }}
              >
                My Fellows
              </Button>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              {userContext.loading ? (
                <FriendsLoading />
              ) : tab ? (
                userContext.user.receivedReqs.map((freq, i) => {
                  return <FriendCard friend={freq} type="request" key={i} />
                })
              ) : (
                //  : (
                //   <Grid
                //     container
                //     className="my-5"
                //     justify="center"
                //     alignItems="center"
                //     direction="column"
                //   >
                //     <FontAwesomeIcon icon={faGrinWink} size="2x" color="grey" />
                //     <Typography variant="caption" color="textSecondary">
                //       No requests out there!
                //     </Typography>
                //   </Grid>
                // )
                userContext.user.friendList.map((friend, i) => {
                  return <FriendCard friend={friend} type="friend" key={i} />
                })
              )}
            </Grid>
            <Button disabled color="secondary">
              People you may also know
            </Button>
            <Grid item xs={12}>
              {allUsers.map((user, index) => {
                return (
                  <FriendCard friend={user} type="not-friend" key={index} />
                )
              })}
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </div>
  )
}
