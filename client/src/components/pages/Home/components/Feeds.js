import { Grid, Paper } from "@material-ui/core"
import React from "react"
import { Home } from "../../../common/Base/Home"
export const Feeds = () => {
  return (
    <Home>
      <Paper>
        <Grid container justify="space-around" direcection="row"></Grid>
      </Paper>
    </Home>
  )
}
