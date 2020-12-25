import { faBookmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Grid, Typography } from "@material-ui/core"
import React from "react"
import { PostCard } from "../../Post/PostCard"

export const BookmarksContent = ({ typeOf, data }) => {
  console.log(typeOf)
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
            return <PostCard style={{ flex: "1" }} key={index} post={item} />
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
  return <div>Jell</div>
}
