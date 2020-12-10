import React, { useContext } from "react"
import { Home } from "../../../common/Base/Home"
import { BlogContext } from "../../../../context/blogContext/BlogContext"
import { LoadingBlog } from "./LoadingBlog"
import { BlogCard } from "./BlogCard"
import { Grid } from "@material-ui/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const Blog = () => {
  const blogContext = useContext(BlogContext)
  return (
    <Home>
      <div className="px-2">
        {blogContext.loading ? (
          <LoadingBlog />
        ) : blogContext.post.length > 0 ? (
          blogContext.post.map((post) => {
            return (
              <div key={post._id}>
                <BlogCard post={post} />
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
              <FontAwesomeIcon icon={"pen-nib"} fontSize="large" />
              <h6 className="mt-2">No post out there</h6>
            </Grid>
          </div>
        )}
      </div>
    </Home>
  )
}
