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
    blog: [],
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
      const response = await axios.get(`${API}/blogs`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("_token"))}`,
        },
      })
      // console.log(response.data)
      dispatch({
        type: BLOG_GET_ALL,
        payload: response.data,
      })
    } catch (error) {
      dispatch({
        type: BLOG_ERROR,
        payload: error.response.data.errorMsg,
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
        `${API}/create/blog/${userId}`,
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
          payload: "Successfully created!",
        })
        getAllBlogs()
        // console.log(response.data)
      }
    } catch (error) {
      // console.log(error.response)
      dispatch({
        type: BLOG_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }

  const deleteBlog = async (userID, blogId) => {
    try {
      const response = await axios.delete(
        `${API}/delete/blog/${userID}/${blogId}`,
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
        payload: error.response.data.errorMsg,
      })
    }
  }

  const updateBlog = async (formData, userId, blogId) => {
    try {
      const response = await axios.put(
        `${API}/update/blog/${userId}/${blogId}`,
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
        payload: error.response.data.errorMsg,
      })
    }
  }

  const getAllBlogsByUserId = async (userId) => {
    try {
      const response = await axios.get(`${API}/${userId}/blogs`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("_token"))}`,
        },
      })
      dispatch({
        type: BLOG_SUCCESS,
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

  const upVoteBlog = async (blogId, userId) => {
    await axios.put(
      `${API}/blog/upvote/${userId}/${blogId}`,
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
  const downVoteBlog = async (blogId, userId) => {
    try {
      await axios.put(
        `${API}/blog/downvote/${userId}/${blogId}`,
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
  const addComment = async (blogId, userId, comment) => {
    try {
      const response = await axios.put(
        `${API}/blog/comment/${userId}/${blogId}`,
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

  const countShare = async (blogId) => {
    try {
      const response = await axios.get(`${API}/share/blog/${blogId}`)
      if (response) {
        return response.data
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
        blog: state.blog,
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
        countShare,
      }}
    >
      {children}
    </BlogContext.Provider>
  )
}
