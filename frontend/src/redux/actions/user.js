import { loginApi, registerApi } from '../../api/registerApi';
import {
  LOGIN_SUCCESS, REGISTER_SUCCESS
} from "./types";


export function registerSuccess(payload) {
  return { type: REGISTER_SUCCESS, payload: payload };
}


const registerAction = ({ first_name, last_name, password, username, email }) => {
  return function (dispatch) {
    return registerApi(first_name, last_name, password, username, email).then((data) => {
      dispatch(registerSuccess({ user: data }));
    })
  }
};


export function loginSuccess(payload) {
  return { type: LOGIN_SUCCESS, payload: payload };
}


const loginAction = ({ email, password }) => {
  return function (dispatch) {
    return loginApi(email, password).then((data) => {
      dispatch(loginSuccess({ user: data }));
    })
  }

};


export { registerAction, loginAction };
