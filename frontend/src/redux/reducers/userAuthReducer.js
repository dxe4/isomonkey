import produce from 'immer'

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
  } from "../actions/types";
  
  export default function rootReducer (state, action) {
    const { type, payload } = action;

    function _reducer(type, payload) {
        switch (type) {
            case REGISTER_SUCCESS: 
              return produce(state, draftState =>  {
                  draftState.user = payload.user;
              });
            case REGISTER_FAIL:
              return produce(state, draftState => {
                  draftState.user = null
              })
            case LOGIN_SUCCESS:
              return produce(state, draftState => {
                  draftState.user = payload.user
              })
            case LOGIN_FAIL:
              return produce(state, draftState => {
                  draftState.user = null
              })
            case LOGOUT:
              return produce(state, draftState => {
                  draftState.user = null
              })
            default:
              return state;
          }
    }
    const result = _reducer(type, payload);
    localStorage.setItem('user', JSON.stringify(result.user || null));
    return result;
  }
