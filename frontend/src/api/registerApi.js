import axios from 'axios'
import produce from 'immer'

const HOST = 'http://localhost:8000/'
const REGISTER_URL = 'api/register'
const LOGIN_URL = 'api/login'


const registerApi = (first_name, last_name, password, username, email) => {
  const url = `${HOST}${REGISTER_URL}`;
  return axios.post(url, {
    first_name: first_name,
    last_name: last_name,
    password: password,
    username: username,
    email: email,
  })
  .then(function (response) {
    const data = produce(response.data.payload, draftState => {
      draftState.token = response.data.token
    })
    return data;
  })
  .catch(function (error) {
    return Promise.reject(error);
  });
}

const loginApi = (email, password) => {
  const url = `${HOST}${LOGIN_URL}`;
  return axios.post(url, {
    password: password,
    email: email,
  })
  .then(function (response) {
    const data = produce(response.data.payload, draftState => {
      draftState.token = response.data.token
    })
    return data;
  })
  .catch(function (error) {
    return Promise.reject(error);
  });
}

export {registerApi, loginApi}
