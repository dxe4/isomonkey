import produce from 'immer'
import axios from './api-client'

const REGISTER_URL = 'api/register'
const LOGIN_URL = 'api/login'


const registerApi = (first_name, last_name, password, username, email) => {
  return axios.post(REGISTER_URL, {
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
  return axios.post(LOGIN_URL, {
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

export { registerApi, loginApi }
