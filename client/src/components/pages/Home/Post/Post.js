import React, { useContext, useEffect } from "react"
import { Home } from "../../../common/Base/Home"
import { PostContext } from "../../../../context/postContext/postContext"
import { PostCard } from "./PostCard"
import CameraIcon from "@material-ui/icons/Camera"
import { LoadingPost } from "./LoadingPost"
import { Grid } from "@material-ui/core"
import { UserContext } from "../../../../context/userContext/UserContext"

export const Post = () => {
  const postContext = useContext(PostContext)
  const userContext = useContext(UserContext)
  useEffect(() => {
    postContext.getAllPost()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Home>
      <div className="px-2">
        {postContext.loading || userContext.loading ? (
          <LoadingPost />
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
