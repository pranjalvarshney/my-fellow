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
        {data.map((item, index) => {
          return <PostCard style={{ flex: "1" }} key={index} post={item} />
        })}
      </div>
    )
  }
  return <div>Jell</div>
}
