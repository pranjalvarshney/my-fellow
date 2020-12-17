import { Grid } from "@material-ui/core"
import React from "react"
import Header from "../../common/Header/Header"
import { HomeSideBar } from "../Home/HomeSideBar"
import { HomeRightBar } from "../Home/HomeRightBar"
import { FriendsTab } from "./components/FriendsTab"
import { AuthContext } from "../../../context/authContext/authContext"
import { useContext } from "react"
import { useEffect } from "react"
import { UserContext } from "../../../context/userContext/UserContext"

export const Friends = () => {
  const authContext = useContext(AuthContext)
  const userContext = useContext(UserContext)
  useEffect(() => {
    userContext.getUserById(authContext.user._id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authContext.user._id])

  useEffect(() => {
    userContext.getAllUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="home">
      <Header />
      <div className="container">
        <Grid container spacing={3} justify="center">
          <Grid item xs={10} md={3}>
            <HomeSideBar />
          </Grid>
          <Grid item xs={10} md={6}>
            <FriendsTab />
          </Grid>
          <Grid item xs={10} md={3}>
            <HomeRightBar />
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
