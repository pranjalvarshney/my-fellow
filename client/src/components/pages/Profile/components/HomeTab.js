import React from "react"
import { PostCard } from "../../Home/Post/PostCard"
import { LoadingPost } from "../../Home/Post/LoadingPost"

export const HomeTab = ({ data }) => {
  return (
    <div className="mt-3">
      {data.length > 0 ? (
        data.map((post) => {
          return <PostCard post={post} key={post._id} />
        })
      ) : (
        <LoadingPost />
      )}
    </div>
  )
}
