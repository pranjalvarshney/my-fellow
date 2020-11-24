import { Grid, IconButton, Paper } from "@material-ui/core"
import React from "react"
import HomeIcon from "@material-ui/icons/Home"
import MenuBookIcon from "@material-ui/icons/MenuBook"
import ViewCarouselIcon from "@material-ui/icons/ViewCarousel"
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter"
import { Link, withRouter } from "react-router-dom"

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "white" }
  } else {
    return { color: "grey" }
  }
}

const HomeCenter = ({ history }) => {
  return (
    <>
      <Paper>
        <Grid container justify="space-around" direcection="row">
          <Grid item>
            <Link to="/" style={currentTab(history, "/")}>
              <IconButton>
                <HomeIcon style={{ fontSize: "28px" }} />
              </IconButton>
            </Link>
          </Grid>
          <Grid item>
            <IconButton>
              <MenuBookIcon style={{ fontSize: "28px" }} />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton>
              <ViewCarouselIcon style={{ fontSize: "28px" }} />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton>
              <BusinessCenterIcon style={{ fontSize: "28px" }} />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}
export default withRouter(HomeCenter)
