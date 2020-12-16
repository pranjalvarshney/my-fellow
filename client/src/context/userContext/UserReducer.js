import { USER_ERROR, USER_LOADING, USER_SUCCESS } from "../types"

/* eslint-disable import/no-anonymous-default-export */
export default (state, action) => {
  switch (action.type) {
    case USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        friends: action.payload.friendList,
        loading: false,
        error: "",
      }
    case USER_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case USER_LOADING:
      return {
        ...state,
        loading: action.payload,
        error: "",
      }
    default:
      return state
  }
}
