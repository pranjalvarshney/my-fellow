import axios from "axios"
import React, { useReducer } from "react"
import { API } from "../../utils/proxy"
import { NOTICE_ERROR, NOTICE_GET, NOTICE_LOADING } from "../types"
import { NoticeContext } from "./NoticeContext"
import NoticeReducer from "./NoticeReducer"

export const NoticeState = ({ children }) => {
  const initialState = {
    notice: [],
    error: "",
    success: "",
    loading: true,
  }
  const [state, dispatch] = useReducer(NoticeReducer, initialState)

  const getNotices = async () => {
    try {
      dispatch({
        type: NOTICE_LOADING,
        payload: true,
      })
      const response = await axios.get(`${API}/notices`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("_token"))}`,
        },
      })
      if (response) {
        dispatch({
          type: NOTICE_GET,
          payload: response.data,
        })
      }
    } catch (error) {
      dispatch({
        type: NOTICE_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }

  return (
    <NoticeContext.Provider
      value={{
        notice: state.notice,
        loading: state.loading,
        error: state.error,
        success: state.success,
        getNotices,
      }}
    >
      {children}
    </NoticeContext.Provider>
  )
}
