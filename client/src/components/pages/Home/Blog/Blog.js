import React, { useContext, useEffect } from "react"
import { Home } from "../../../common/Base/Home"
import { BlogContext } from "../../../../context/blogContext/BlogContext"
import { LoadingBlog } from "./LoadingBlog"
import { BlogCard } from "./BlogCard"
import { Grid } from "@material-ui/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons"
import { UserContext } from "../../../../context/userContext/UserContext"

export const Blog = () => {
  const blogContext = useContext(BlogContext)
  const userContext = useContext(UserContext)
  useEffect(() => {
    blogContext.getAllBlogs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Home>
      <div className="px-2">
        {blogContext.loading || userContext.loading ? (
          <LoadingBlog />
        ) : blogContext.blog.length > 0 ? (
          blogContext.blog.map((blog) => {
            // console.log(blogContext.blog)
            return (
              <div key={blog._id}>
                <BlogCard blog={blog} />
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
              <FontAwesomeIcon icon={faPencilAlt} fontSize="large" />
              <h6 className="mt-2">No blog out there</h6>
            </Grid>
          </div>
        )}
      </div>
    </Home>
  )
}
