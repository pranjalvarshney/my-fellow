import axios from "axios"
import React, { useReducer } from "react"
import { API } from "../../utils/proxy"
import {
  USER_ERROR,
  USER_LOADING,
  USER_SUCCESS,
  ADD_FRIEND_REQUEST,
  UN_FRIEND_REQUEST,
  FRIEND_REQUEST_ACCEPT,
  FRIEND_REQUEST_DELETE,
} from "../types"
import { UserContext } from "./UserContext"
import UserReducer from "./UserReducer"

export const UserState = ({ children }) => {
  const initialState = {
    user: null,
    friends: null,
    error: "",
    success: "",
    loading: true,
  }
  const [state, dispatch] = useReducer(UserReducer, initialState)

  const getAllUsers = async () => {
    try {
      const response = await axios.get(`${API}/users`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("_token"))}`,
        },
      })
      const { data } = response
      return data
    } catch (error) {
      dispatch({
        type: USER_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }

  const getUserById = async (userId) => {
    try {
      dispatch({
        type: USER_LOADING,
        payload: true,
      })
      const response = await axios.get(`${API}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("_token"))}`,
        },
      })
      // console.log(response.data)
      dispatch({
        type: USER_SUCCESS,
        payload: response.data,
      })
      const { data } = response
      return data
    } catch (error) {
      dispatch({
        type: USER_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }

  const sendFriendRequest = async (userId, friendId) => {
    try {
      dispatch({
        type: USER_LOADING,
        payload: true,
      })
      const response = await axios.put(
        `${API}/addfriend/${userId}`,
        { friendId },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("_token")
            )}`,
          },
        }
      )
      console.log(response.data)
      dispatch({
        type: ADD_FRIEND_REQUEST,
        payload: response.data,
      })
    } catch (error) {
      dispatch({
        type: USER_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }

  const unFriend = async (userId, friendId) => {
    try {
      dispatch({
        type: USER_LOADING,
        payload: true,
      })
      const response = await axios.put(`${API}/unfriend/${userId}`, friendId, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("_token"))}`,
        },
      })
      console.log(response.data)
      dispatch({
        type: UN_FRIEND_REQUEST,
        payload: response.data,
      })
    } catch (error) {
      dispatch({
        type: USER_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }

  const acceptFriendRequest = async (userId, friendId) => {
    try {
      dispatch({
        type: USER_LOADING,
        payload: true,
      })
      const response = await axios.put(
        `${API}/acceptrequest/${userId}`,
        friendId,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("_token")
            )}`,
          },
        }
      )
      console.log(response.data)
      dispatch({
        type: FRIEND_REQUEST_ACCEPT,
        payload: response.data,
      })
    } catch (error) {
      dispatch({
        type: USER_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }
  const rejectFriendRequest = async (userId, friendId) => {
    try {
      dispatch({
        type: USER_LOADING,
        payload: true,
      })
      const response = await axios.put(
        `${API}/rejectrequest/${userId}`,
        friendId,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("_token")
            )}`,
          },
        }
      )
      console.log(response.data)
      dispatch({
        type: FRIEND_REQUEST_DELETE,
        payload: response.data,
      })
    } catch (error) {
      dispatch({
        type: USER_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        friends: state.friends,
        loading: state.loading,
        error: state.error,
        success: state.success,
        getUserById,
        sendFriendRequest,
        unFriend,
        acceptFriendRequest,
        rejectFriendRequest,
        getAllUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
