import { Grid } from "@material-ui/core"
import React from "react"

export const FriendsLoading = () => {
  return (
    <Grid container justify="center">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </Grid>
  )
}
