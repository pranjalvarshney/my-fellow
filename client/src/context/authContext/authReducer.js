/* eslint-disable import/no-anonymous-default-export */
import {
  AUTH_LOADING,
  AUTH_SIGNIN,
  AUTH_SIGNIN_ERROR,
  AUTH_SIGNUP,
  AUTH_SIGNUP_ERROR,
  SIGNOUT_USER,
} from "../types"

export default (state, action) => {
  switch (action.type) {
    case AUTH_SIGNUP:
    case AUTH_SIGNIN:
      return {
        ...state,
        isAuthenticated: true,
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
        isAuthenticated: false,
      }
    case SIGNOUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null,
        loading: false,
      }
    default:
      return state
  }
}
