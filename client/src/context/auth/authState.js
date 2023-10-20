import React, { useContext, useReducer } from "react";
import { LOGIN, LOGOUT } from "../types";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import jwt from "jsonwebtoken";
import axios from "axios";
import errorResponse from "../../utils/errorResponse";

const initialState = {
  user: null,
  token: null,
};

const token = localStorage.getItem("42950b395f17ff66a3ba5357470602d4a6b194e749a8a001e4349be0a1b29503a819b2be7bfe56e6e86ef69cf5946daacdb43faeb0da5fa6234fbb417f0d5a5c");

if (token) {
  const decodedToken = jwt.decode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("42950b395f17ff66a3ba5357470602d4a6b194e749a8a001e4349be0a1b29503a819b2be7bfe56e6e86ef69cf5946daacdb43faeb0da5fa6234fbb417f0d5a5c");
  } else {
    initialState.token = token;
    initialState.user = decodedToken;
  }
}

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const signup = async (userData) => {
    try {
      await axios.post("/api/auth/signup", userData);
    } catch (error) {
      errorResponse(error)
    }
  };

  const login = async (userData) => {
    try {
      const { data } = await axios.post(
        "/api/auth/login",
        userData
      );
      
      sessionStorage.removeItem('prevSearches')
      sessionStorage.removeItem('history')
      sessionStorage.removeItem('homepage')

      dispatch({
        type: LOGIN,
        payload: {
          token: data.token,
          user: data.user
        },
      });
    } catch (error) {
      errorResponse(error)
    }
  };

  const logout = () => {
    dispatch({
      type: LOGOUT,
    });
    sessionStorage.removeItem('prevSearches')
    sessionStorage.removeItem('history')
    sessionStorage.removeItem('homepage')
  };
  
  const values = {
    token: state.token,
    user: state.user,
    signup,
    login,
    logout,
  }

  return (
    <AuthContext.Provider
      value={ values }
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
