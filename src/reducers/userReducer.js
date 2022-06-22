import {
  SET_LOADING,
  SIGN_IN_USER_SUCCESS,
  AUTH_FAIL,
  SIGN_UP_USER_SUCCESS,
  GET_AUTH_USER,
  SIGN_OUT_USER_SUCCESS,
  SET_INITIAL_LOADING,
  SET_LOCAL_LOADING,
  UPATED_USER,
} from "../constants/actionTypes";

const initialState = {
  token: null,
  user: null,
  isLoading: true,
  isLoadingInitial: true,
  isLoadingLocal: false,
  isAuth: false,
  error: null,
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_FAIL:
      return {
        ...state,
        token: null,
        user: null,
        isLoading: false,
        isLoadingInitial: false,
        isAuth: false,
        error: payload,
      };
    case SIGN_IN_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        token: payload.token,
        user: payload.user,
        error: null,
      };
    case SIGN_UP_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuth: false,
        token: payload.token,
        user: payload.user,
        error: null,
      };
    case SET_LOADING:
      return { ...state, isLoading: true };
    case SET_INITIAL_LOADING:
      return { ...state, isLoadingInitial: true };
    case SET_LOCAL_LOADING:
      return { ...state, isLoadingLocal: payload };
    case GET_AUTH_USER:
      return {
        ...state,
        isLoadingInitial: false,
        isLoading: false,
        isAuth: true,
        user: payload.user,
      };
    case SIGN_OUT_USER_SUCCESS:
      return {
        ...state,
        token: null,
        user: null,
        isLoading: false,
        isAuth: false,
        error: payload,
      };
    case UPATED_USER:
      return {
        ...state,
        user: { ...state.user, ...payload },
      };
    default:
      return state;
  }
};

export default userReducer;
