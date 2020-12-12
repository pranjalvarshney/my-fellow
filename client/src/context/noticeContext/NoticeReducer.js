import { NOTICE_ERROR, NOTICE_GET, NOTICE_LOADING } from "../types"

/* eslint-disable import/no-anonymous-default-export */
export default (state, action) => {
  switch (action.type) {
    case NOTICE_GET:
      return {
        ...state,
        notice: action.payload,
        loading: false,
        error: "",
      }
    case NOTICE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case NOTICE_LOADING:
      return {
        state,
        error: "",
        loading: action.payload,
      }
    default:
      return state
  }
}
