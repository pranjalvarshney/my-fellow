import axios from "axios"
import React, { useReducer } from "react"
import { API } from "../../utils/proxy"
import {
  POSTS_CREATE,
  POSTS_ERROR,
  POSTS_GET_ALL,
  POSTS_LOADING,
  POSTS_SUCCESS,
} from "../types"
import { PostContext } from "./postContext"
import postReducer from "./postReducer"

export const PostState = ({ children }) => {
  const initialState = {
    post: [],
    error: "",
    success: "",
    loading: true,
  }
  const [state, dispatch] = useReducer(postReducer, initialState)

  const getAllPost = async () => {
    try {
      dispatch({
        type: POSTS_LOADING,
        payload: true,
      })
      // console.log(state)
      const response = await axios.get(`${API}/posts`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("_token"))}`,
        },
      })

      // console.log(state)
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
        payload: "Successfully created!",
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

  const deletePost = async (userID, postId) => {
    try {
      const response = await axios.delete(
        `${API}/delete/post/${userID}/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("_token")
            )}`,
          },
        }
      )
      dispatch({
        type: POSTS_SUCCESS,
        payload: response.data.message,
      })
      getAllPost()
      // console.log(response.data)
    } catch (error) {
      console.log(error.response)
    }
  }

  return (
    <PostContext.Provider
      value={{
        post: state.post,
        loading: state.loading,
        error: state.error,
        success: state.success,
        getAllPost,
        createPost,
        deletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}
