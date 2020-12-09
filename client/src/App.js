import React from "react"
import "./App.css"
import { Routing } from "./components/common/Routing"
import { AuthState } from "./context/authContext/AuthState"
import { BlogState } from "./context/blogContext/BlogState"
import { PostState } from "./context/postContext/PostState"

export const App = () => {
  return (
    <AuthState>
      <PostState>
        <BlogState>
          <Routing />
        </BlogState>
      </PostState>
    </AuthState>
  )
}
