import { Grid } from "@material-ui/core"
import React from "react"
import { Contacts } from "./Contacts"
import { PollCard } from "./PollCard"

export const HomeRightBar = () => {
  return (
    <div className="home-right-bar">
      <Grid container direction="column" justify="center">
        <PollCard />
        <Contacts />
      </Grid>
    </div>
  )
}
