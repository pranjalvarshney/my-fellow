import axios from "axios"
import React, { useReducer } from "react"
import { API } from "../../utils/proxy"
import { USER_ERROR, USER_LOADING, USER_SUCCESS } from "../types"
import { UserContext } from "./UserContext"
import UserReducer from "./UserReducer"

export const UserState = ({ children }) => {
  const initialState = {
    user: null,
    error: "",
    success: "",
    loading: true,
  }
  const [state, dispatch] = useReducer(UserReducer, initialState)

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

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        success: state.success,
        getUserById,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
