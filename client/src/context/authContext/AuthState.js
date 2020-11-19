import React, { useReducer } from "react";
import { AuthContext } from "./authContext";
import authReducer from "./authReducer";
import axios from "axios";
import {
  AUTH_LOADING,
  AUTH_SIGNIN,
  AUTH_SIGNIN_ERROR,
  AUTH_SIGNUP,
  AUTH_ERROR,
  AUTH_SIGNUP_ERROR,
  SIGNOUT_USER,
  USER_LOADED,
} from "../types";
import { API } from "../../utils/proxy";

export const AuthState = ({ children }) => {
  const initialState = {
    isAuthenticated: false,
    loading: false,
    error: null,
    user: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);
  const loadUser = async () => {
    try {
      dispatch({
        type: AUTH_LOADING,
        payload: true,
      });
      const response = await axios.get(`${API}/isme`);
      dispatch({
        type: USER_LOADED,
        payload: response.data,
      });
    } catch (error) {
      dispatch({ type: AUTH_ERROR, payload: error.response.data.err });
    }
  };
  const signupUser = async (signupData) => {
    try {
      dispatch({
        type: AUTH_LOADING,
        payload: true,
      });
      const response = await axios.post(
        `${API}/signup`,
        JSON.stringify(signupData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      dispatch({
        type: AUTH_SIGNUP,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: AUTH_SIGNUP_ERROR,
        payload: error.response.data,
      });
    }
  };

  const signinUser = async (signinData) => {
    try {
      dispatch({
        type: AUTH_LOADING,
        payload: true,
      });
      const response = await axios.post(
        `${API}/signin`,
        JSON.stringify(signinData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      dispatch({
        type: AUTH_SIGNIN,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: AUTH_SIGNIN_ERROR,
        payload: error.response.data,
      });
    }
  };

  const signoutUser = async () => {
    try {
      await axios.get(`${API}/signout`);
    } catch (error) {
      dispatch({
        type: SIGNOUT_USER,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        signupUser,
        signinUser,
        signoutUser,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
