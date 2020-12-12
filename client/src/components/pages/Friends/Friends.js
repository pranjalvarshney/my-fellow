import { Grid } from "@material-ui/core"
import React from "react"
import Header from "../../common/Header/Header"
import { HomeSideBar } from "../Home/HomeSideBar"

export const Friends = () => {
  return (
    <div className="home">
      <Header />
      <div className="container">
        <Grid container>
          <Grid item xs={10} md={3}>
            <HomeSideBar />
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
