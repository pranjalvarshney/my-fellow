import axios from "axios"
import React, { useReducer } from "react"
import { API } from "../../utils/proxy"
import {
  POSTS_CREATE,
  POSTS_ERROR,
  POSTS_GET_ALL,
  POSTS_LOADING,
} from "../types"
import { PostContext } from "./postContext"
import postReducer from "./postReducer"

export const PostState = ({ children }) => {
  const initialState = {
    post: [],
    error: "",
    loading: true,
  }
  const [state, dispatch] = useReducer(postReducer, initialState)

  const getAllPost = async () => {
    try {
      dispatch({
        type: POSTS_LOADING,
        payload: true,
      })
      console.log(state)
      const response = await axios.get(`${API}/posts`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("_token"))}`,
        },
      })

      console.log(state)
      console.log(response.data)
      dispatch({
        type: POSTS_GET_ALL,
        payload: response.data,
      })
    } catch (error) {
      console.log(error.response)
      dispatch({
        type: POSTS_ERROR,
        payload: error.response,
      })
    }
  }

  const createPost = async (formData, userId) => {
    try {
      dispatch({
        type: POSTS_LOADING,
        payload: true,
      })

      const response = await axios.post(
        `${API}/create/post/${userId}`,
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("_token")
            )}`,
          },
        }
      )
      dispatch({
        type: POSTS_CREATE,
        payload: response.data,
      })
      console.log(response.data)
    } catch (error) {
      console.log(error.response)
      dispatch({
        type: POSTS_ERROR,
        payload: error.response,
      })
    }
  }

  return (
    <PostContext.Provider
      value={{
        post: state.post,
        loading: state.loading,
        error: state.error,
        getAllPost,
        createPost,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}
