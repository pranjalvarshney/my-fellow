import {
  BLOG_CREATE,
  BLOG_ERROR,
  BLOG_GET_ALL,
  BLOG_LOADING,
  BLOG_SUCCESS,
} from "../types"

/* eslint-disable import/no-anonymous-default-export */
export default (state, action) => {
  switch (action.type) {
    case BLOG_CREATE:
      return {
        ...state,
        success: action.payload,
        loading: false,
        error: "",
      }
    case BLOG_LOADING:
      return {
        ...state,
        loading: true,
        error: "",
        success: "",
      }
    case BLOG_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: "",
      }
    case BLOG_GET_ALL:
      return {
        ...state,
        blog: action.payload,
        loading: false,
        error: "",
        success: "",
      }
    case BLOG_SUCCESS:
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
