import React, { useContext } from "react"
import { PostCard } from "../../Home/Post/PostCard"
import { LoadingPost } from "../../Home/Post/LoadingPost"
import { LoadingBlog } from "../../Home/Blog/LoadingBlog"
import { BlogCard } from "../../Home/Blog/BlogCard"
import { PostContext } from "../../../../context/postContext/postContext"
import { Grid } from "@material-ui/core"
import CameraIcon from "@material-ui/icons/Camera"
import { BlogContext } from "../../../../context/blogContext/BlogContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons"

export const HomeTab = ({ data, type }) => {
  const postContext = useContext(PostContext)
  const blogContext = useContext(BlogContext)
  if (type === "post")
    return (
      <div className="mt-3">
        {!postContext.loading ? (
          data.length > 0 ? (
            data.map((post) => {
              return <PostCard post={post} key={post._id} />
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
          )
        ) : (
          <LoadingPost />
        )}
      </div>
    )
  if (type === "blog")
    return (
      <div className="mt-3">
        {!blogContext.loading ? (
          data.length > 0 ? (
            data.map((blog) => {
              return <BlogCard blog={blog} key={blog._id} />
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
                <FontAwesomeIcon icon={faPencilAlt} fontSize="large" />
                <h6 className="mt-2">No blog out there</h6>
              </Grid>
            </div>
          )
        ) : (
          <LoadingBlog />
        )}
      </div>
    )
}
