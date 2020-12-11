import React from "react"
import "./App.css"
import { Routing } from "./components/common/Routing"
import { AuthState } from "./context/authContext/AuthState"
import { BlogState } from "./context/blogContext/BlogState"
import { PostState } from "./context/postContext/PostState"
import { UserState } from "./context/userContext/UserState"

export const App = () => {
  return (
    <AuthState>
      <UserState>
        <PostState>
          <BlogState>
            <Routing />
          </BlogState>
        </PostState>
      </UserState>
    </AuthState>
  )
}
