import { faBoxOpen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@material-ui/core"
import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { AuthContext } from "../../../context/authContext/authContext"
import { BlogContext } from "../../../context/blogContext/BlogContext"
import { PostContext } from "../../../context/postContext/postContext"
import { UserContext } from "../../../context/userContext/UserContext"
import Header from "../../common/Header/Header"
import { InputBox } from "../Home/InputBox"
import { EditProfileModal } from "../Modals/EditProfileModal"
import { HomeTab } from "./components/HomeTab"
import { Loading } from "../../Loading_Backdrop/Loading"
import { API } from "../../../utils/proxy"
import { ProfilePictureModal } from "../Modals/ProfilePictureModal"

export const Profile = ({ match }) => {
  const history = useHistory()
  const [data, setData] = useState(null)
  const [dataPost, setDataPost] = useState([])
  const [dataBlog, setDataBlog] = useState([])
  const [type, setType] = useState("post")
  const postContext = useContext(PostContext)
  const blogContext = useContext(BlogContext)
  const userContext = useContext(UserContext)
  const authContext = useContext(AuthContext)
  const [picModal, setPicModal] = useState(false)
  const [editStatus, setEditStatus] = useState(false)
  useEffect(() => {
    const fetchUserDetails = async (userId) => {
      try {
        await userContext.getUserById(userId)
      } catch (error) {}
    }
    fetchUserDetails(match.params.userId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.params.userId])

  useEffect(() => {
    async function fetchPostsByUser() {
      const abc = await postContext.getAllPostByUserId(match.params.userId)
      setDataPost(abc)
      setData(abc)
    }
    async function fetchBlogsByUser() {
      const abc = await blogContext.getAllBlogsByUserId(match.params.userId)
      setDataBlog(abc)
    }
    if (userContext.user) {
      fetchPostsByUser()
      fetchBlogsByUser()
    }
    // setData(abc.data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.params.userId])

  const handleClick = async (typeOf) => {
    if (typeOf === "post") {
      setData(dataPost)
      setType(typeOf)
    }
    if (typeOf === "blog") {
      setData(dataBlog)
      setType(typeOf)
    }
    if (typeOf === "bookmark") {
      history.push(`/bookmarks`)
    }
    // setData(response)
  }
  if (
    userContext.user === null ||
    userContext.user._id !== match.params.userId
  ) {
    return <Loading />
  }
  const handleEditBtn = () => {
    setEditStatus(!editStatus)
  }

  const handlePicAvatar = () => {
    setPicModal(!picModal)
  }
  return (
    <div className="home" style={{ overflowY: "auto" }}>
      <Header />
      {<EditProfileModal show={editStatus} onHide={handleEditBtn} />}
      {
        <ProfilePictureModal
          show={picModal}
          onHide={handlePicAvatar}
          userContext={userContext}
        />
      }
      <div className="container">
        <Grid container justify="center">
          <Grid item xs={10}>
            <Card variant="elevation" elevation={3}>
              <Grid
                container
                justify="center"
                alignItems="flex-start"
                className="p-3 "
              >
                <Grid item xs={12} md={4}>
                  <Grid container justify="center" alignContent="center">
                    <IconButton
                      onClick={
                        userContext.user._id === authContext.user._id
                          ? handlePicAvatar
                          : null
                      }
                    >
                      <Avatar
                        style={{ width: "150px", height: "150px" }}
                        alt={userContext.user.name}
                        src={`${API}/pic/user/${userContext.user._id}`}
                      />
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={7}>
                  <Grid container justify="center">
                    <CardContent>
                      <Typography gutterBottom variant="h4" component="h2">
                        {userContext.user.name}
                      </Typography>
                      <Grid container spacing={3} justify="flex-start">
                        <Grid item>
                          <h6>
                            <b>{dataPost.length} </b>Post
                          </h6>
                        </Grid>
                        <Grid item>
                          <h6>
                            <b>{dataBlog.length} </b>Blogs
                          </h6>
                        </Grid>
                        <Grid item>
                          <h6>
                            <b>{userContext.user.friendList.length} </b>Friends
                          </h6>
                        </Grid>
                      </Grid>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {userContext.user.intro}
                      </Typography>
                    </CardContent>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={1}>
                  <Grid container justify="center">
                    {userContext.user._id === authContext.user._id ? (
                      <Button
                        variant="text"
                        color="primary"
                        onClick={handleEditBtn}
                        size="small"
                      >
                        Edit
                      </Button>
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>
            </Card>
            <div className="mt-3">
              <Grid container spacing={3} justify="space-around">
                <Grid item xs={12} md={4}>
                  <Card variant="elevation" elevation={3}>
                    <CardContent>
                      <Grid
                        container
                        justify="space-between"
                        alignItems="center"
                      >
                        <Grid item>
                          {userContext.user.role === 0 && (
                            <Typography
                              variant="button"
                              color="primary"
                              gutterBottom
                            >
                              Student
                            </Typography>
                          )}
                          {userContext.user.role === 1 && (
                            <Typography
                              variant="button"
                              color="primary"
                              gutterBottom
                            >
                              Faculty
                            </Typography>
                          )}
                        </Grid>
                        <Grid item>
                          <Typography variant="caption">
                            Year {userContext.user.year}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Typography variant="body1">
                        {userContext.user.branch}
                      </Typography>

                      <Typography variant="body2">
                        Gautam Buddha University
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <Grid container justify="flex-end" alignItems="center">
                        {userContext.user._id === authContext.user._id ? (
                          <Button
                            onClick={handleEditBtn}
                            size="small"
                            variant="text"
                            color="primary"
                          >
                            Edit
                          </Button>
                        ) : null}
                      </Grid>
                    </CardActions>
                  </Card>
                  <Card
                    variant="elevation"
                    elevation={3}
                    className="mt-3 text-center"
                  >
                    <CardContent>
                      <IconButton className="w-100">
                        <FontAwesomeIcon icon={faBoxOpen} />
                      </IconButton>
                      <Typography>Joined on</Typography>
                      <Typography variant="button">
                        {new Date(userContext.user.createdAt).toDateString()}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item md={8} xs={12}>
                  {userContext.user._id === authContext.user._id ? (
                    <InputBox />
                  ) : null}
                  <Paper variant="outlined">
                    <Grid container justify="space-around">
                      <Grid item xs={3}>
                        <Button
                          variant="text"
                          fullWidth
                          color={`${type === "post" ? "primary" : "default"}`}
                          onClick={() => {
                            setData(null)
                            handleClick("post")
                          }}
                        >
                          Posts
                        </Button>
                      </Grid>
                      <Grid item xs={3}>
                        <Button
                          variant="text"
                          fullWidth
                          color={`${type === "blog" ? "primary" : "default"}`}
                          onClick={() => {
                            setData(null)
                            handleClick("blog")
                          }}
                        >
                          Blogs
                        </Button>
                      </Grid>
                      <Grid item xs={3}>
                        <Button
                          variant="text"
                          fullWidth
                          color={`${type === "ads" ? "primary" : "default"}`}
                          onClick={() => {
                            setData(null)
                            handleClick("ads")
                          }}
                        >
                          Ads
                        </Button>
                      </Grid>
                      {userContext.user._id === authContext.user._id && (
                        <Grid item xs={3}>
                          <Button
                            variant="text"
                            fullWidth
                            color={`${
                              type === "bookmark" ? "primary" : "default"
                            }`}
                            onClick={() => {
                              setData(null)
                              handleClick("bookmark")
                            }}
                          >
                            Bookmarks
                          </Button>
                        </Grid>
                      )}
                    </Grid>
                  </Paper>
                  {data ? (
                    <HomeTab data={data} type={type} />
                  ) : (
                    <div> loading</div>
                  )}
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
