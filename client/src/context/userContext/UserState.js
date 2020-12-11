import React, { useReducer } from "react"
import { UserContext } from "./UserContext"
import UserReducer from "./UserReducer"
import axios from "axios"
import { API } from "../../utils/proxy"
import { USER_ERROR, USER_LOADING, USER_SUCCESS } from "../types"

export const UserState = () => {
  const initialState = {
    user: null,
    error: "",
    success: "",
    loading: true,
  }
  const [state, dispatch] = useReducer(UserReducer, initialState)

  const getUserById = async (userId) => {
    dispatch({
      type: USER_LOADING,
      payload: true,
    })
    try {
      const response = await axios.get(`${API}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("_token"))}`,
        },
      })
      dispatch({
        type: USER_SUCCESS,
        payload: response.data,
      })
      console.log(response.data)
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
        loading: state.loading,
        error: state.error,
        success: state.success,
        getUserById,
      }}
    ></UserContext.Provider>
  )
}
