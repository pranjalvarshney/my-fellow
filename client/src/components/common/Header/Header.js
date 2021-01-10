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
import { Link, useHistory, withRouter } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faUserGraduate,
  faHome,
  faBookReader,
  faHandsHelping,
} from "@fortawesome/free-solid-svg-icons"
import { FeedbackModal } from "../../pages/Modals/FeedbackModal"

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#03DAC6", fontSize: "28px" }
  } else {
    return { color: "grey", fontSize: "24px" }
  }
}
const Header = ({ history }) => {
  const usehistory = useHistory()
  const authContext = useContext(AuthContext)
  const [showFeedback, setShowFeedback] = useState(false)
  const [moreOption, setMoreOption] = useState(null)
  const handleMoreOption = (e) => {
    setMoreOption(e.currentTarget)
  }
  const open = Boolean(moreOption)
  const handleClose = () => {
    setMoreOption(null)
  }

  const handleFeedback = () => {
    setShowFeedback(!showFeedback)
  }
  const styleTheme =
    authContext.theme === "dark"
      ? { background: "#212121", textColor: "white" }
      : { background: "white" }

  // console.log(authContext)
  return (
    <div className="header">
      {showFeedback ? (
        <FeedbackModal show={showFeedback} onhide={handleFeedback} />
      ) : null}
      <AppBar style={styleTheme} elevation={3}>
        <Toolbar className="header">
          <div className="header-part-1">
            <Button
              style={{ textTransform: "none" }}
              onClick={() => {
                usehistory.push("/")
              }}
            >
              {/* <img src="/logo1.png" alt="logo" height="40px" /> */}
              <Typography variant="h6" id="header-name">
                My Fellow
              </Typography>
            </Button>
          </div>
          <div className="header-part-2">
            <Grid container justify="space-around" direcection="row">
              <Grid item>
                <Link to="/">
                  <IconButton>
                    <FontAwesomeIcon
                      icon={faHome}
                      style={currentTab(history, "/")}
                    />
                  </IconButton>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/blogs">
                  <IconButton>
                    <FontAwesomeIcon
                      icon={faBookReader}
                      style={currentTab(history, "/blogs")}
                    />
                  </IconButton>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/ads">
                  <IconButton>
                    <FontAwesomeIcon
                      icon={faHandsHelping}
                      style={currentTab(history, "/ads")}
                    />
                  </IconButton>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/jobs-and-placements">
                  <IconButton>
                    <FontAwesomeIcon
                      icon={faUserGraduate}
                      style={currentTab(history, "/jobs-and-placements")}
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
              <MenuItem
                // onClick={handleClose}
                onClick={() => {
                  history.push(`/profile/${authContext.user._id}`)
                }}
              >
                View Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  usehistory.push("/about-university")
                }}
              >
                About University
              </MenuItem>
              {/* <MenuItem
                onClick={() => {
                  usehistory.push("/help-support")
                }}
              >
                Help & Support
              </MenuItem> */}
              <MenuItem
                onClick={() => {
                  usehistory.push("/settings-privacy")
                }}
              >
                Settings & Privacy
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleFeedback()
                  handleClose()
                }}
              >
                Give Feedback
              </MenuItem>
              <MenuItem
                onClick={() => {
                  authContext.signoutUser()
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
