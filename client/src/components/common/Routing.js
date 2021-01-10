import {
  createMuiTheme,
  Snackbar,
  SnackbarContent,
  ThemeProvider,
} from "@material-ui/core"
import React, { useContext, useEffect, useState } from "react"
import { BrowserRouter, Switch } from "react-router-dom"
import { AuthContext } from "../../context/authContext/authContext"
import { PrivateRoute } from "../auth/PrivateRoute"
import { SimpleRoute } from "../auth/SimpleRoute"
import { Loading } from "../Loading_Backdrop/Loading"
import { Login } from "../Login/Login"
import { Signup } from "../Login/Signup"
import { Post } from "../pages/Home/Post/Post"
import { Blog } from "../pages/Home/Blog/Blog"
import { Profile } from "../pages/Profile/Profile"
import { JobsAndPlacements } from "../pages/Home/JobsAndPlacements/JobsAndPlacements"
import { Ads } from "../pages/Home/Ads/Ads"
import { PostContext } from "../../context/postContext/postContext"
import { BlogContext } from "../../context/blogContext/BlogContext"
import { UserContext } from "../../context/userContext/UserContext"
import { Friends } from "../pages/Friends/Friends"
import { AboutUniversity } from "../pages/AboutUniversity/AboutUniversity"
import { SettingsPrivacy } from "../pages/Setting-Privacy/SettingsPrivacy"
import { Bookmarks } from "../pages/Home/Bookmarks/Bookmarks"
import { CampusSignup } from "../Login/CampusSignup"
import { Notice } from "../pages/Home/Notice/Notice"
// import { Feedback } from "../pages/Feedback/Feedback"

export const Routing = () => {
  const authContext = useContext(AuthContext)
  const postContext = useContext(PostContext)
  const blogContext = useContext(BlogContext)
  const userContext = useContext(UserContext)

  const [responseMsg, setResponseMsg] = useState({
    successStatus: false,
    errorStatus: false,
    msg: "",
    color: null,
  })
  // useEffect(() => {
  //   if (authContext.user._id) {
  //     userContext.getUserById(authContext.user._id)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])
  // const [darkTheme, setDarkTheme] = useState(false)

  // let themeCheck = localStorage.getItem("_theme")
  // useEffect(() => {
  //   if (!themeCheck) {
  //     localStorage.setItem("_theme", "light")
  //   } else {
  //     if (themeCheck === "light") {
  //       setDarkTheme(false)
  //     } else {
  //       setDarkTheme(true)
  //     }
  //   }
  // }, [themeCheck])

  const handleClose = () => {
    setResponseMsg({
      ...responseMsg,
      successStatus: false,
      errorStatus: false,
      msg: "",
      color: null,
    })
  }
  const showResponseMsg = () => {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={responseMsg.errorStatus || responseMsg.successStatus}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <SnackbarContent
          message={responseMsg.msg}
          style={{
            background: responseMsg.color,
            display: "flex",
            justifyContent: "center",
          }}
        />
      </Snackbar>
    )
  }

  useEffect(() => {
    if (authContext.error) {
      setResponseMsg({
        errorStatus: true,
        msg: authContext.error,
        color: "#ff7961",
      })
    }
    if (blogContext.error) {
      setResponseMsg({
        errorStatus: true,
        msg: blogContext.error,
        color: "#ff7961",
      })
    }
    if (postContext.error) {
      setResponseMsg({
        errorStatus: true,
        msg: postContext.error,
        color: "#ff7961",
      })
    }
    if (userContext.error) {
      setResponseMsg({
        errorStatus: true,
        msg: userContext.error,
        color: "#ff7961",
      })
    }
    if (authContext.success) {
      setResponseMsg({
        successStatus: true,
        msg: authContext.success,
        color: "#58D68D",
      })
    }
    if (postContext.success) {
      setResponseMsg({
        successStatus: true,
        msg: postContext.success,
        color: "#58D68D",
      })
    }
    if (blogContext.success) {
      setResponseMsg({
        successStatus: true,
        msg: blogContext.success,
        color: "#58D68D",
      })
    }
  }, [authContext, postContext, blogContext, userContext])
  const styleTheme =
    authContext.theme === "dark"
      ? { background: "black", color: "white" }
      : { background: "whitesmoke", color: "black" }
  const prefersDarkMode = authContext.theme
  const mainPrimaryColor = prefersDarkMode === "dark" ? "#03DAC6" : "#3551bf"
  const mainSecondaryColor = prefersDarkMode === "dark" ? "#018786" : "#002984"
  const paperColor = prefersDarkMode === "dark" ? "#212121" : "#fff"
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode === "dark" ? "dark" : "light",
          background: {
            paper: paperColor,
          },
          primary: {
            main: mainPrimaryColor,
          },
          secondary: {
            main: mainSecondaryColor,
          },
        },
      }),
    [mainPrimaryColor, mainSecondaryColor, paperColor, prefersDarkMode]
  )
  return (
    <div style={styleTheme}>
      {responseMsg.errorStatus || responseMsg.successStatus
        ? showResponseMsg()
        : null}
      {authContext.loading && <Loading />}
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <PrivateRoute exact path="/" component={Post} />
            <PrivateRoute exact path="/posts" component={Post} />
            <PrivateRoute exact path="/bookmarks" component={Bookmarks} />
            <PrivateRoute
              exact
              path="/jobs-and-placements"
              component={JobsAndPlacements}
            />
            <PrivateRoute exact path="/ads" component={Ads} />
            <PrivateRoute exact path="/blogs" component={Blog} />
            <PrivateRoute exact path="/profile/:userId" component={Profile} />
            <PrivateRoute exact path="/fellows" component={Friends} />
            <PrivateRoute exact path="/notices" component={Notice} />
            <PrivateRoute
              exact
              path="/about-university"
              component={AboutUniversity}
            />
            {/* <PrivateRoute exact path="/feedback" component={Feedback} /> */}
            <PrivateRoute
              exact
              path="/settings-privacy"
              component={SettingsPrivacy}
            />
            {/* <PrivateRoute exact path="/help-support" component={HelpSupport} /> */}

            <SimpleRoute exact path="/signup" component={Signup} />
            <SimpleRoute exact path="/signup-campus" component={CampusSignup} />
            <SimpleRoute exact path="/signin" component={Login} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  )
}
