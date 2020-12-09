import axios from "axios"
import React, { useReducer } from "react"
import { API } from "../../utils/proxy"
import {
  BLOG_CREATE,
  BLOG_ERROR,
  BLOG_GET_ALL,
  BLOG_LOADING,
  BLOG_SUCCESS,
} from "../types"
import { BlogContext } from "./BlogContext"
import BlogReducer from "./BlogReducer"

export const BlogState = ({ children }) => {
  const initialState = {
    post: [],
    error: "",
    success: "",
    loading: true,
  }
  const [state, dispatch] = useReducer(BlogReducer, initialState)

  const getAllBlogs = async () => {
    try {
      dispatch({
        type: BLOG_LOADING,
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
        type: BLOG_GET_ALL,
        payload: response.data,
      })
    } catch (error) {
      console.log(error.response)
      dispatch({
        type: BLOG_ERROR,
        payload: error.response,
      })
    }
  }

  const createBlog = async (formData, userId) => {
    try {
      dispatch({
        type: BLOG_LOADING,
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
          type: BLOG_CREATE,
          payload: "Successfully created!",
        })
        getAllBlogs()
        // console.log(response.data)
      }
    } catch (error) {
      // console.log(error.response)
      dispatch({
        type: BLOG_ERROR,
        payload: error.response,
      })
    }
  }

  const deleteBlog = async (userID, postId) => {
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
          type: BLOG_SUCCESS,
          payload: response.data.message,
        })
        getAllBlogs()
      }
    } catch (error) {
      dispatch({
        type: BLOG_ERROR,
        payload: error.response,
      })
    }
  }

  const updateBlog = async (formData, userId, postId) => {
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
          type: BLOG_CREATE,
          payload: "Updated Successfully!",
        })
        getAllBlogs()
      }
    } catch (error) {
      dispatch({
        type: BLOG_ERROR,
        payload: error.response,
      })
    }
  }

  const getAllBlogsByUserId = async (userId) => {
    try {
      const response = await axios.get(`${API}/${userId}/posts`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("_token"))}`,
        },
      })
      const { data } = response
      return data
    } catch (error) {
      dispatch({
        type: BLOG_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }

  const upVoteBlog = async (postId, userId) => {
    await axios.put(
      `${API}/blog/like/${userId}/${postId}`,
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
        type: BLOG_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }
  const downVoteBlog = async (postId, userId) => {
    try {
      await axios.put(
        `${API}/blog/unlike/${userId}/${postId}`,
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
        type: BLOG_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }
  const addComment = async (postId, userId, comment) => {
    try {
      const response = await axios.put(
        `${API}/blog/comment/${userId}/${postId}`,
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
        getAllBlogs()
      }
    } catch (error) {
      dispatch({
        type: BLOG_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }

  return (
    <BlogContext.Provider
      value={{
        post: state.post,
        loading: state.loading,
        error: state.error,
        success: state.success,
        getAllBlogs,
        createBlog,
        updateBlog,
        deleteBlog,
        getAllBlogsByUserId,
        upVoteBlog,
        downVoteBlog,
        addComment,
      }}
    >
      {children}
    </BlogContext.Provider>
  )
}
