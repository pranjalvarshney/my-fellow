import axios from "axios"
import React, { useReducer } from "react"
import { API } from "../../utils/proxy"
import { POSTS_GET_ALL } from "../types"
import { PostContext } from "./postContext"
import postReducer from "./postReducer"

export const PostState = ({ children }) => {
  const initialState = {
    post: [],
    error: "",
    loading: "",
  }
  const [state, dispatch] = useReducer(postReducer, initialState)

  const getAllPost = async () => {
    try {
      const response = await axios.get(`${API}/posts`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("_token"))}`,
        },
      })
      console.log(response.data)
      dispatch({
        type: POSTS_GET_ALL,
        payload: response.data,
      })
    } catch (error) {}
  }

  return (
    <PostContext.Provider value={{ post: state.post, getAllPost }}>
      {children}
    </PostContext.Provider>
  )
}
