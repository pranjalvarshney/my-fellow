import { faBookmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Grid, Typography } from "@material-ui/core"
import React from "react"
import { BlogCard } from "../../Blog/BlogCard"
import { PostCard } from "../../Post/PostCard"

export const BookmarksContent = ({ typeOf, data }) => {
  // console.log(typeOf)
  if (typeOf === "post") {
    return (
      <div
        className="bookmark-wrapper"
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          height: "470px",
          width: "60%",
          overflowY: "auto",
          margin: "auto",
        }}
      >
        {data.length > 0 ? (
          data.map((item, index) => {
            return (
              <div key={index} className="mx-auto mb-3 w-100">
                <PostCard post={item} />
              </div>
            )
          })
        ) : (
          <div
            style={{
              height: "30vh",
              width: "100%",
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
              <FontAwesomeIcon
                icon={faBookmark}
                color="grey"
                fontSize="large"
              />
              <h6 className="mt-2">No bookmarks yet!</h6>
              <Typography variant="overline">
                Click the icon to bookmark
              </Typography>
            </Grid>
          </div>
        )}
      </div>
    )
  }
  if (typeOf === "blog") {
    return (
      <div
        className="bookmark-wrapper"
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          width: "60%",
          height: "470px",

          overflowY: "auto",
          margin: "auto",
        }}
      >
        {data.length > 0 ? (
          data.map((item, index) => {
            return (
              <div className="mx-auto mb-3 w-100" key={index}>
                <BlogCard style={{ flex: "1" }} blog={item} />
              </div>
            )
          })
        ) : (
          <div
            className="m-auto"
            style={{
              height: "30vh",
              width: "100%",
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
              <FontAwesomeIcon
                icon={faBookmark}
                color="grey"
                fontSize="large"
              />
              <h6 className="mt-2">No bookmarks yet!</h6>
              <Typography variant="overline">
                Click the icon to bookmark
              </Typography>
            </Grid>
          </div>
        )}
      </div>
    )
  }
  return <div>Not Found!</div>
}
