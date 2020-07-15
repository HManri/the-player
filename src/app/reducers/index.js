import { combineReducers } from 'redux';
import searchMusic from './searchMusic';

const rootReducer = combineReducers({ searchMusic });

export const mainReducer = (state, action) => {
    return rootReducer(state, action);
};
