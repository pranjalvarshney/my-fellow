import { Grid } from "@material-ui/core"
import React from "react"
import { Base } from "../../common/Base/Base"
import { HomeRightBar } from "./components/HomeRightBar"
import { HomeSideBar } from "./components/HomeSideBar"
import "./Home.css"

export const Home = ({ children }) => {
  return (
    <Base>
      <div className="home">
        <Grid container justify="space-evenly" direction="row">
          <Grid item xs={3}>
            <HomeSideBar />
          </Grid>
          <Grid item xs={5}>
            {children}
          </Grid>
          <Grid item xs={3}>
            <HomeRightBar />
          </Grid>
        </Grid>
      </div>
    </Base>
  )
}
