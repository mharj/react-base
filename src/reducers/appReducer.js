import {GLOBAL_TYPES} from './index';

export const ACTION_TYPES = Object.freeze({
	LOADING: 			'LOADING',
	LOADING_DONE: 		'LOADING_DONE',
	LOADING_ERROR: 		'LOADING_ERROR',
	LOADING_NO_CHANGE:	'LOADING_NO_CHANGE',
	LOGIN:				'LOGIN',
	LOGIN_ERROR:		'LOGIN_ERROR',
	LOGOUT:				'LOGOUT',
});

export const initialState = {
	isLoading: false,
	value: null,
	etag: null,
	error: null,
	isLoggedIn: false,
};


export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPES.LOADING:
			return {
				...state,
				isLoading: true,
				error: null,
			};
		case ACTION_TYPES.LOADING_DONE:
			return {
				...state,
				isLoading: false,
				value: action.value,
				etag: action.etag,
			};
		case ACTION_TYPES.LOADING_NO_CHANGE:
			return {
				...state,
				isLoading: false,
			};
		case ACTION_TYPES.LOADING_ERROR:
			return {
				...state,
				isLoading: false,
				value: null,
				etag: null,
				error: action.error,
			};
		case ACTION_TYPES.LOGIN:
			return {
				...state,
				isLoggedIn: true,
				error: null,
			};
		case ACTION_TYPES.LOGIN_ERROR:
			return {
				...state,
				error: action.error,
				isLoggedIn: false,
			};
		case ACTION_TYPES.LOGOUT:
			return {
				...state,
				isLoggedIn: false,
				error: null,
			};
		case GLOBAL_TYPES.RESET:
			return initialState;
		default:
			return state;
	}
};
