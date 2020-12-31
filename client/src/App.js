import React from "react"
import "./App.css"
import { Routing } from "./components/common/Routing"
import { AuthState } from "./context/authContext/AuthState"
import { BlogState } from "./context/blogContext/BlogState"
import { NoticeState } from "./context/noticeContext/NoticeState"
import { PollState } from "./context/pollContext/PollState"
import { PostState } from "./context/postContext/PostState"
import { UserState } from "./context/userContext/UserState"

export const App = () => {
  return (
    <AuthState>
      <UserState>
        <PostState>
          <BlogState>
            <PollState>
              <NoticeState>
                <Routing />
              </NoticeState>
            </PollState>
          </BlogState>
        </PostState>
      </UserState>
    </AuthState>
  )
}
