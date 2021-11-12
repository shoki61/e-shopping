import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { app } from './reducers';

const rootStore = combineReducers({ app });

export const store = createStore(rootStore, applyMiddleware(thunk));
