import {GLOBAL_TYPES} from './index';

export const ACTION_TYPES = Object.freeze({
	APP_LOADING:		'APP_LOADING',
	APP_ERROR:			'APP_ERROR',
	APP_LOGIN:			'APP_LOGIN',
	APP_DATA:			'APP_DATA',
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
		case ACTION_TYPES.APP_LOADING: {
			return {
				...state,
				isLoading: action.isLoading?true:false,
			};
		}
		case ACTION_TYPES.APP_ERROR: {
			return {
				...state,
				error: action.error,
			};
		}
		case ACTION_TYPES.APP_LOGIN: {
			return {
				...state,
				isLoggedIn: action.isLoggedIn,
			};
		}
		case ACTION_TYPES.APP_DATA: {
			return {
				...state,
				value: action.value,
				etag: action.etag,
			};
		}
		case GLOBAL_TYPES.RESET:
			return initialState;
		default:
			return state;
	}
};
