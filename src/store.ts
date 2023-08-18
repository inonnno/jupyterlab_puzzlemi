import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers';
import thunkMiddleware from 'redux-thunk';

const middleware = [thunkMiddleware];
const store = createStore(rootReducer, applyMiddleware(...middleware));
console.log('create store');
export default store;
