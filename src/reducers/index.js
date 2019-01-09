import {combineReducers} from 'redux';
import {reducer as appReducer, initialState as appInitialState} from './appReducer';

export const GLOBAL_TYPES = Object.freeze({
	RESET: 'RESET',
});

export const rootReducer = combineReducers({
	app: appReducer,
});

export const initialState = {
	app: appInitialState,
};
