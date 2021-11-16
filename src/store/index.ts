import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { app, user } from './reducers';

const rootStore = combineReducers({ app, user });

export const store = createStore(rootStore, applyMiddleware(thunk));
