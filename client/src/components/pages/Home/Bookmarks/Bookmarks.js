import { Button, Divider, Grid, Paper, Typography } from "@material-ui/core"
import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../../context/userContext/UserContext"
import Header from "../../../common/Header/Header"
import { HomeSideBar } from "../HomeSideBar"
import { LoadingPost } from "../Post/LoadingPost"
import { BookmarksContent } from "./components/BookmarksContent"

export const Bookmarks = () => {
  const userContext = useContext(UserContext)
  const [data, setData] = useState(null)
  const [typeOf, setTypeOf] = useState(null)

  useEffect(() => {
    if (!userContext.loading) {
      setTypeOf("post")
      setData(userContext.user.bookmark.post)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userContext.loading])

  const handleBtnClick = async (type) => {
    if (type === "post") {
      setTypeOf("post")
      setData(userContext.user.bookmark.post)
    }
    if (type === "blog") {
      setTypeOf("blog")
      setData(userContext.user.bookmark.blog)
    }
    if (type === "ads") {
      setTypeOf("ads")
      setData(userContext.user.bookmark.ads)
    }
    if (type === "job") {
      setTypeOf("job")
      setData(userContext.user.bookmark.job)
    }
  }
  return (
    <div className="home">
      <Header />
      <div className="container">
        <Grid container spacing={3} justify="center">
          <Grid item md={3}>
            <HomeSideBar />
          </Grid>
          <Grid item md={9}>
            <Paper variant="elevation" elevation={3} className="p-3">
              <Typography variant="body1">Bookmarks</Typography>
              <Grid container justify="center">
                <Grid>
                  <Button
                    color={typeOf === "post" ? "primary" : "default"}
                    onClick={() => handleBtnClick("post")}
                  >
                    Posts
                  </Button>
                </Grid>
                <Grid>
                  <Button
                    color={typeOf === "blog" ? "primary" : "default"}
                    onClick={() => handleBtnClick("blog")}
                  >
                    Blogs
                  </Button>
                </Grid>
                <Grid>
                  <Button
                    color={typeOf === "ads" ? "primary" : "default"}
                    onClick={() => handleBtnClick("ads")}
                  >
                    Ads
                  </Button>
                </Grid>
                <Grid>
                  <Button
                    color={typeOf === "job" ? "primary" : "default"}
                    onClick={() => handleBtnClick("job")}
                  >
                    Jobs
                  </Button>
                </Grid>
              </Grid>
              <Divider
                className="mt-1 mb-3"
                style={{ background: "#3f51b5" }}
              />
              {userContext.loading ? (
                <LoadingPost />
              ) : (
                <BookmarksContent typeOf={typeOf} data={data} />
              )}
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
