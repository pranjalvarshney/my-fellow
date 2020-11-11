import React from "react"
import "./Header.css"
import {
  AppBar,
  Button,
  Container,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core"
import MoreVertIcon from "@material-ui/icons/MoreVert"

export const Header = () => {
  return (
    <div className="header">
      <AppBar color="white" elevation={3}>
        <Container>
          <Toolbar className="header">
            <Button>
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
        </Container>{" "}
      </AppBar>
    </div>
  )
}
