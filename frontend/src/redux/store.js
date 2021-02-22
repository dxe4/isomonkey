import userAuthReducer from "./reducers/userAuthReducer";
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';


const user = JSON.parse(localStorage.getItem("user"));
const initialState = {
    user: user
}

const store = createStore(
  userAuthReducer,
  initialState,
  applyMiddleware(thunk)
);

export default store;
