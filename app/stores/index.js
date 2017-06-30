import { createStore } from 'redux';
import todoReducer from '../reducers/index.js'

const todoStore = createStore(todoReducer);

export default todoStore;