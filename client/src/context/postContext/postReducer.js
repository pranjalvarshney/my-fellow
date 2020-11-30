import { POSTS_GET_ALL } from "../types"

/* eslint-disable import/no-anonymous-default-export */
export default (state, action) => {
  switch (action.type) {
    case POSTS_GET_ALL:
      return {
        ...state,
        post: action.payload,
      }
    default:
      return state
  }
}
