import { Grid } from "@material-ui/core"
import React from "react"
import Header from "../../common/Header/Header"
import { HomeSideBar } from "../Home/HomeSideBar"
import { HomeRightBar } from "../Home/HomeRightBar"
import { FriendsTab } from "./components/FriendsTab"

export const Friends = () => {
  return (
    <div className="home">
      <Header />
      <div className="container">
        <Grid container spacing={3}>
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
