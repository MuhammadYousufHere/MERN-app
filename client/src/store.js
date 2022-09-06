import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './features/index';

const store = configureStore(rootReducer);

export default store;

// createStore === configureStore
// combineReducer ~ Automatically called while passing rootReducers
// devtool extension by default enabled
// middleware also enabled ~ Woahh!
