import { Grid } from "@material-ui/core"
import React from "react"
import { HomeRightBar } from "../../pages/Home/components/HomeRightBar"
import { HomeSideBar } from "../../pages/Home/components/HomeSideBar"
import Header from "../Header/Header"
import "./Home.css"

export const Home = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="home">
        <Grid container justify="center" direction="row">
          <Grid item md={3}>
            <HomeSideBar />
          </Grid>
          <Grid item md={5}>
            {children}
          </Grid>
          <Grid item md={3}>
            <HomeRightBar />
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
