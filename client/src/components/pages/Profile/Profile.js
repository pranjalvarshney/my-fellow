import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core"
import React, { useContext, useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import { BlogContext } from "../../../context/blogContext/BlogContext"
import { PostContext } from "../../../context/postContext/postContext"
import { UserContext } from "../../../context/userContext/UserContext"
import Header from "../../common/Header/Header"
import { InputBox } from "../Home/InputBox"
import { HomeTab } from "./components/HomeTab"
import "./Profile.css"

export const Profile = ({ match }) => {
  const [data, setData] = useState(null)
  const [dataPost, setDataPost] = useState([])
  const [dataBlog, setDataBlog] = useState([])
  const [type, setType] = useState("post")
  const postContext = useContext(PostContext)
  const blogContext = useContext(BlogContext)
  const userContext = useContext(UserContext)

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
    fetchPostsByUser()
    fetchBlogsByUser()
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
    // setData(response)
  }
  if (userContext.user === null) {
    return <Redirect to="/" />
  }
  return (
    <div className="profile container">
      <Header />
      <Grid justify="center" container>
        <Grid item xs={10} md={10}>
          <Card className="px-3 py-3" variant="outlined">
            <Grid container direction="row" spacing={1} justify="flex-start">
              <Grid
                item
                container
                md={3}
                justify="center"
                alignContent="center"
              >
                <CardMedia
                  component="img"
                  style={{ maxWidth: "150px" }}
                  image="data:image/png;base64,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"
                  label={userContext.user.name}
                />
              </Grid>
              <Grid container item md={7}>
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
                          <b>{"27"} </b>Friends
                        </h6>
                      </Grid>
                    </Grid>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {userContext.user.bio}
                    </Typography>
                  </CardContent>
                </Grid>
              </Grid>
              <Grid
                className="mt-3"
                container
                item
                md={2}
                justify="center"
                alignItems="flex-start"
              >
                <Button variant="text" size="small" color="primary">
                  Edit
                </Button>
              </Grid>
            </Grid>
          </Card>
          <div className="mt-3">
            <Grid container spacing={3} justify="space-around">
              <Grid item xs={12} md={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Word of the Day
                    </Typography>
                    <Typography variant="h5" component="h2">
                      benevolent
                    </Typography>
                    <Typography color="textSecondary">adjective</Typography>
                    <Typography variant="body2" component="p">
                      well meaning and kindly.
                      <br />
                      {'"a benevolent smile"'}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item md={8} xs={12}>
                <InputBox />
                <Paper variant="outlined">
                  <Grid container justify="space-around">
                    <Grid item xs={3}>
                      <Button
                        variant="text"
                        fullWidth
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
                        onClick={() => handleClick()}
                      >
                        Ads
                      </Button>
                    </Grid>
                    <Grid item xs={3}>
                      <Button
                        variant="text"
                        fullWidth
                        onClick={() => handleClick()}
                      >
                        Bookmark
                      </Button>
                    </Grid>
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
  )
}
