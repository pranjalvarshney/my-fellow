import {
  ADD_FRIEND_REQUEST,
  ALL_USERS,
  FRIEND_REQUEST_ACCEPT,
  FRIEND_REQUEST_DELETE,
  UN_FRIEND_REQUEST,
  USER_ERROR,
  USER_LOADING,
  USER_SUCCESS,
} from "../types"

/* eslint-disable import/no-anonymous-default-export */
export default (state, action) => {
  switch (action.type) {
    case USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: "",
      }
    case USER_ERROR:
      return {
        ...state,
        user: null,
        error: action.payload,
        loading: false,
      }
    case USER_LOADING:
      return {
        ...state,
        loading: action.payload,
        error: "",
      }
    case ADD_FRIEND_REQUEST:
      return {
        ...state,
        loading: false,
        error: "",
      }
    case FRIEND_REQUEST_ACCEPT:
      return {
        ...state,
        loading: false,
        error: "",
      }
    case FRIEND_REQUEST_DELETE:
      return {
        ...state,
        loading: false,
        error: "",
      }
    case UN_FRIEND_REQUEST:
      return {
        ...state,
        loading: false,
        error: "",
      }
    case ALL_USERS:
      return {
        ...state,
        all: action.payload,
        loading: false,
        error: "",
      }
    default:
      return state
  }
}
