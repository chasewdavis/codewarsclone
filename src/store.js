import { createStore, applyMiddleware } from 'redux';
import reducer from './ducks/reducer';
import promiseMiddleware from 'redux-promise-middleware';
// import logger from 'redux-logger'; // great for development, not nessacary for deployment

export default createStore(reducer, applyMiddleware(promiseMiddleware()));