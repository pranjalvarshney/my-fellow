import React, { useContext, useEffect } from "react"
import { Home } from "../../../common/Base/Home"
import { PostContext } from "../../../../context/postContext/postContext"
import { PostCard } from "./PostCard"
import CameraIcon from "@material-ui/icons/Camera"
import { Card, CardContent, CardHeader, Grid } from "@material-ui/core"
import { Skeleton } from "@material-ui/lab"

export const Post = () => {
  const postContext = useContext(PostContext)
  useEffect(() => {
    postContext.getAllPost()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const LoadingPost = () => {
    return (
      <Card variant="outlined">
        <CardHeader
          avatar={
            <Skeleton
              animation="wave"
              variant="circle"
              width={40}
              height={40}
            />
          }
          action={null}
          title={
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          }
          subheader={<Skeleton animation="wave" height={10} width="40%" />}
        />
        <Skeleton
          animation="wave"
          variant="rect"
          style={{ width: "100%", height: "250px" }}
        />
        <CardContent>
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={10} width="80%" />
        </CardContent>
      </Card>
    )
  }
  return (
    <Home>
      <div className="px-2">
        {postContext.loading ? (
          LoadingPost()
        ) : postContext.post.length > 0 ? (
          postContext.post.map((post) => {
            return (
              <div key={post._id}>
                <PostCard post={post} />
              </div>
            )
          })
        ) : (
          <div
            className="m-auto"
            style={{
              height: "30vh",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Grid
              container
              spacing={3}
              direction="column"
              justify="center"
              alignItems="center"
            >
              <CameraIcon fontSize="large" />
              <h6 className="mt-2">No post out there</h6>
            </Grid>
          </div>
        )}
      </div>
    </Home>
  )
}
