import {combineReducers} from 'redux';
import * as app from './appReducer';

export const GLOBAL_TYPES = Object.freeze({
	RESET: 'RESET',
});

/**
 * Combine all initial states
 * @see {@link createStore/default}
 */
export const initialState = {
	app: app.initialState,
};

/**
 * Combine all reducers with names
 */
export const rootReducer = combineReducers({
	app: app.reducer,
});
