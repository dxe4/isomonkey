import produce from 'immer';
import {
  LOGIN_FAIL, LOGIN_SUCCESS,
  LOGOUT, REGISTER_FAIL, REGISTER_SUCCESS
} from "../actions/types";
import initialState from './initialState';

  
  export default function userAuthReducer (state = initialState.userAuthReducer, action) {
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
    
    if (typeof(result) !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(result.user || null));    
    }
    
    return result;
  }
