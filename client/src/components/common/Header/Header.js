import React, { useContext, useState } from "react"
import "./Header.css"
import {
  AppBar,
  Button,
  Fade,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import { AuthContext } from "../../../context/authContext/authContext"
import HomeIcon from "@material-ui/icons/Home"
import MenuBookIcon from "@material-ui/icons/MenuBook"
import ViewCarouselIcon from "@material-ui/icons/ViewCarousel"
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter"
import { Link, withRouter } from "react-router-dom"

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "red", fontSize: "30px" }
  } else {
    return { color: "grey", fontSize: "28px" }
  }
}
const Header = ({ history }) => {
  const context = useContext(AuthContext)
  const [moreOption, setMoreOption] = useState(null)
  const handleMoreOption = (e) => {
    setMoreOption(e.currentTarget)
  }
  const open = Boolean(moreOption)
  const handleClose = () => {
    setMoreOption(null)
  }

  return (
    <div className="header">
      <AppBar style={{ background: "white" }} elevation={3}>
        <Toolbar className="header">
          <div className="header-part-1">
            <Button style={{ textTransform: "none" }}>
              <img src="/logo192.png" alt="logo" height="40px" />
              <Typography variant="h6">My Fellow</Typography>
            </Button>
          </div>
          <div className="header-part-2">
            <Grid container justify="space-around" direcection="row">
              <Grid item>
                <Link to="/">
                  <IconButton>
                    <HomeIcon style={currentTab(history, "/")} />
                  </IconButton>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/blogs">
                  <IconButton>
                    <MenuBookIcon style={currentTab(history, "/blogs")} />
                  </IconButton>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/ads">
                  <IconButton>
                    <ViewCarouselIcon style={currentTab(history, "/ads")} />
                  </IconButton>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/internships-and-placements">
                  <IconButton>
                    <BusinessCenterIcon
                      style={currentTab(history, "/internships-and-placements")}
                    />
                  </IconButton>
                </Link>
              </Grid>
            </Grid>
          </div>

          <div className="header-part-3">
            <TextField
              id="outlined-password-input"
              label="Search"
              type="text"
              size="small"
              variant="outlined"
            />
            <IconButton onClick={handleMoreOption}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="fade-menu"
              anchorEl={moreOption}
              keepMounted
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem onClick={handleClose}>View Profile</MenuItem>
              <MenuItem onClick={handleClose}>About University</MenuItem>
              <MenuItem onClick={handleClose}>Help & Support</MenuItem>
              <MenuItem onClick={handleClose}>Settings & Privacy</MenuItem>
              <MenuItem onClick={handleClose}>Give Feedback</MenuItem>
              <MenuItem
                onClick={() => {
                  context.signoutUser()
                }}
              >
                Signout
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}
export default withRouter(Header)
