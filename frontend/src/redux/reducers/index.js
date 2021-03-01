import { combineReducers } from 'redux';
import filesReducer from './filesReducer';
import userAuthReducer from './userAuthReducer';

const rootReducer = combineReducers({
    userAuthReducer,
    filesReducer,
})

export default rootReducer;
