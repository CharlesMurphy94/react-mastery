import { createStore, applyMiddleware } from 'redux';
import reducer from './ducks/reducer';
import reduxPromiseMiddleware from 'redux-promise-middleware'


let store = createStore(reducer,applyMiddleware(reduxPromiseMiddleware()))
export default store
