import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import initialState from './reducers/initialState';


const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk)
);

export default store;
