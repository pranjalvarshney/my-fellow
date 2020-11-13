import React from "react"
import "./Header.css"
import {
  AppBar,
  Button,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core"
import MoreVertIcon from "@material-ui/icons/MoreVert"

export const Header = () => {
  return (
    <div className="header">
      <AppBar style={{ background: "white" }} elevation={3}>
        <Toolbar className="header">
          <Button style={{ textTransform: "none" }}>
            <img src="/logo192.png" alt="logo" height="40px" />
            <Typography variant="h6">My Fellow</Typography>
          </Button>
          <div className="header-row">
            <TextField
              id="outlined-password-input"
              label="Search"
              type="text"
              size="small"
              variant="outlined"
            />
            <Typography>
              <Button>Home</Button>
              <Button>My Friends</Button>
              <Button>Profile</Button>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}
