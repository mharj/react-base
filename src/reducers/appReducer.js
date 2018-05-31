export const ACTION_TYPES = Object.freeze({
	LOADING:			'LOADING',
	LOADING_DONE:		'LOADING_DONE',
	LOADING_ERROR:		'LOADING_ERROR',
	LOADING_NO_CHANGE:	'LOADING_NO_CHANGE',
	LOGIN:				'LOGIN',
	LOGOUT:				'LOGOUT',
});

export default (state = {
	isLoading: false,
	value: null,
	etag: null,
	error: null,
	username: null,
	password: null,
}, {type, isLoading, value, username, password, etag, error}) => {
	switch (type) {
		case ACTION_TYPES.LOADING:
			return Object.assign({}, state, {
				isLoading: true,
				error: null,
			});
		case ACTION_TYPES.LOADING_DONE:
			return Object.assign({}, state, {
				isLoading: false,
				value: value,
				etag: etag,
			});
		case ACTION_TYPES.LOADING_NO_CHANGE:
			return Object.assign({}, state, {
				isLoading: false,
			});
		case ACTION_TYPES.LOADING_ERROR:
			return Object.assign({}, state, {
				isLoading: false,
				value: null,
				etag: null,
				error: error,
			});
		case ACTION_TYPES.LOGIN:
			return Object.assign({}, state, {
				username: username,
				password: password,
			});
		case ACTION_TYPES.LOGOUT:
			return Object.assign({}, state, {
				username: null,
				password: null,
			});
		default:
			return state;
	}
};
