import {
  POSTS_CREATE,
  POSTS_ERROR,
  POSTS_GET_ALL,
  POSTS_LOADING,
} from "../types"

/* eslint-disable import/no-anonymous-default-export */
export default (state, action) => {
  switch (action.type) {
    case POSTS_CREATE:
      return {
        ...state,
        loading: false,
      }
    case POSTS_LOADING:
      return {
        ...state,
        loading: action.payload,
      }
    case POSTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case POSTS_GET_ALL:
      return {
        ...state,
        post: action.payload,
        loading: false,
      }
    default:
      return state
  }
}
