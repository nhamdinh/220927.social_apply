import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  API_LOGIN,
} from "./../../const";
import axios from "axios";

export const act_LoginStart = (userCredentials) => ({
  type: LOGIN_START,
});

export const act_LoginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const act_LoginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});
export const fetchUser = (userCredentials) => async (dispatch) => {
  dispatch(act_LoginStart(userCredentials));
  try {
    const res = await axios.post(API_LOGIN, userCredentials);
    dispatch(act_LoginSuccess(res.data));
  } catch (err) {
    dispatch(act_LoginSuccess(err));
  }
};
