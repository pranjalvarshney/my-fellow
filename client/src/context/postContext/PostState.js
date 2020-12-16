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
      // console.log(response.data)
      dispatch({
        type: POSTS_GET_ALL,
        payload: response.data,
      })
    } catch (error) {
      // console.log(error.response)
      dispatch({
        type: POSTS_ERROR,
        payload: error.response.data.errorMsg,
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
      if (response) {
        dispatch({
          type: POSTS_CREATE,
          payload: "Successfully created!",
        })
        getAllPost()
        // console.log(response.data)
      }
    } catch (error) {
      // console.log(error.response)
      dispatch({
        type: POSTS_ERROR,
        payload: error.response.data.errorMsg,
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
      if (response) {
        dispatch({
          type: POSTS_SUCCESS,
          payload: response.data.message,
        })
        getAllPost()
      }
    } catch (error) {
      dispatch({
        type: POSTS_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }

  const updatePost = async (formData, userId, postId) => {
    try {
      const response = await axios.put(
        `${API}/update/post/${userId}/${postId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("_token")
            )}`,
          },
        }
      )
      if (response) {
        dispatch({
          type: POSTS_CREATE,
          payload: "Updated Successfully!",
        })
        getAllPost()
      }
    } catch (error) {
      dispatch({
        type: POSTS_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }

  const getAllPostByUserId = async (userId) => {
    try {
      const response = await axios.get(`${API}/${userId}/posts`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("_token"))}`,
        },
      })
      dispatch({
        type: POSTS_SUCCESS,
      })
      const { data } = response
      return data
    } catch (error) {
      dispatch({
        type: POSTS_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }

  const likePost = async (postId, userId) => {
    await axios.put(
      `${API}/post/like/${userId}/${postId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("_token"))}`,
        },
      }
    )
    try {
    } catch (error) {
      dispatch({
        type: POSTS_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }
  const unLikePost = async (postId, userId) => {
    try {
      await axios.put(
        `${API}/post/unlike/${userId}/${postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("_token")
            )}`,
          },
        }
      )
    } catch (error) {
      dispatch({
        type: POSTS_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }
  const addComment = async (postId, userId, comment) => {
    try {
      const response = await axios.put(
        `${API}/post/comment/${userId}/${postId}`,
        { text: comment },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("_token")
            )}`,
          },
        }
      )
      if (response) {
        getAllPost()
      }
    } catch (error) {
      dispatch({
        type: POSTS_ERROR,
        payload: error.response.data.errorMsg,
      })
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
        updatePost,
        deletePost,
        getAllPostByUserId,
        likePost,
        unLikePost,
        addComment,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}
