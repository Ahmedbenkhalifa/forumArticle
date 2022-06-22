import axios from "axios";
import {
  SET_LOADING,
  SIGN_IN_USER_SUCCESS,
  AUTH_FAIL,
  SIGN_UP_USER_SUCCESS,
  GET_AUTH_USER,
  SIGN_OUT_USER_SUCCESS,
  SET_INITIAL_LOADING,
  UPATED_USER,
} from "../constants/actionTypes";

export const signIn = (formData) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const { data } = await axios.post("/api/auth/login", formData);
    localStorage.setItem("token", data.token);
    axios.defaults.headers.common["Authorization"] = data.token;
    dispatch({ type: SIGN_IN_USER_SUCCESS, payload: data });
  } catch (error) {
    const res = error.response.data;
    dispatch({ type: AUTH_FAIL, payload: res });
  }
};

export const signUp = (formData) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const { data } = await axios.post("/api/auth/register", formData);
    //   localStorage.setItem("token", data.token);
    dispatch({ type: SIGN_UP_USER_SUCCESS, payload: data });
  } catch (error) {
    const res = error.response.data;
    dispatch({ type: AUTH_FAIL, payload: res });
  }
};

export const signOut = () => async (dispatch) => {
  try {
    localStorage.removeItem("token");
    dispatch({ type: SIGN_OUT_USER_SUCCESS });
  } catch (error) {
    const res = error.response.data;
    dispatch({ type: AUTH_FAIL, payload: res });
  }
};

export const getAuthUser = () => async (dispatch) => {
  try {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");
    dispatch({ type: SET_INITIAL_LOADING });
    const { data } = await axios.get("/api/auth/current");
    dispatch({
      type: GET_AUTH_USER,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: AUTH_FAIL, payload: null });
  }
};

export const updateUser = (payload) => ({
  type: UPATED_USER,
  payload,
});
