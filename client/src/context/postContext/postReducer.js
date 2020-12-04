import {
  POSTS_CREATE,
  POSTS_ERROR,
  POSTS_GET_ALL,
  POSTS_LOADING,
  POSTS_SUCCESS,
} from "../types"

/* eslint-disable import/no-anonymous-default-export */
export default (state, action) => {
  switch (action.type) {
    case POSTS_CREATE:
      return {
        ...state,
        success: action.payload,
        loading: false,
        error: "",
      }
    case POSTS_LOADING:
      return {
        ...state,
        loading: true,
        error: "",
        success: "",
      }
    case POSTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: "",
      }
    case POSTS_GET_ALL:
      return {
        ...state,
        post: action.payload,
        loading: false,
        error: "",
        success: "",
      }
    case POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
        error: "",
      }
    default:
      return state
  }
}
