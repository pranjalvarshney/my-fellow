import React, { useContext, useState } from "react"
import "./Header.css"
import {
  AppBar,
  Button,
  Fade,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import { AuthContext } from "../../../context/authContext/authContext"

export const Header = () => {
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
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}
