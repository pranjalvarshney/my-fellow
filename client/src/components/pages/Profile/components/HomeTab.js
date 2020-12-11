import React from "react"
import { PostCard } from "../../Home/Post/PostCard"
import { LoadingPost } from "../../Home/Post/LoadingPost"
import { LoadingBlog } from "../../Home/Blog/LoadingBlog"
import { BlogCard } from "../../Home/Blog/BlogCard"

export const HomeTab = ({ data, type }) => {
  if (type === "post")
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
  if (type === "blog")
    return (
      <div className="mt-3">
        {data.length > 0 ? (
          data.map((blog) => {
            return <BlogCard blog={blog} key={blog._id} />
          })
        ) : (
          <LoadingBlog />
        )}
      </div>
    )
}
