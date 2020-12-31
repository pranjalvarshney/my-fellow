/* eslint-disable import/no-anonymous-default-export */
import {
  AUTH_LOADING,
  AUTH_SIGNIN,
  AUTH_SIGNIN_ERROR,
  AUTH_SIGNUP,
  AUTH_SIGNUP_ERROR,
  CHANGE_THEME,
  SIGNOUT_USER,
} from "../types"

export default (state, action) => {
  switch (action.type) {
    case AUTH_SIGNUP:
      console.log(action.payload)
      return {
        ...state,
        user: null,
        isLoggedIn: false,
        loading: false,
        error: null,
      }
    case AUTH_SIGNIN:
      // console.log(action.payload)
      // localStorage.setItem("token", action.payload.token)
      return {
        ...state,
        user: action.payload.user,
        isLoggedIn: true,
        loading: false,
        error: null,
      }
    case AUTH_LOADING:
      return {
        ...state,
        loading: action.payload,
        error: null,
      }
    case AUTH_SIGNIN_ERROR:
    case AUTH_SIGNUP_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        user: null,
        isLoggedIn: false,
      }
    case SIGNOUT_USER:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        error: null,
        loading: false,
      }
    case CHANGE_THEME:
      return {
        ...state,
        theme: action.payload,
      }
    default:
      return state
  }
}
