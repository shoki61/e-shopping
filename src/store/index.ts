import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

const rootStore = combineReducers({});

export const store = createStore(rootStore, applyMiddleware(thunk));
