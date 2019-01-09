import {ACTION_TYPES as TYPES} from '../reducers/appReducer';

// demo helper
const delay = (duration) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, duration);
	});
};

export const getHome = () => (dispatch, getState) => {
	const {
		app: {etag},
	} = getState();
	dispatch({type: TYPES.LOADING});
	//  ajax delay 1sec
	const headers = {};
	if (etag) {
		headers['if-none-match'] = etag;
	}
	return delay(1000).then(() => {
		return fetch('/api/hello', {headers: headers})
			.then((response) => {
				let etag = null;
				if (response.status === 304) {
					return Promise.resolve(dispatch({type: TYPES.LOADING_NO_CHANGE}));
				} else {
					if (response.headers.has('ETag')) {
						etag = response.headers.get('ETag').replace(/"/g, '');
					}
					return response.json().then((json) => {
						if (json && json.hello) {
							return Promise.resolve(dispatch({type: TYPES.LOADING_DONE, value: json.hello, etag: etag}));
						}
					});
				}
			})
			.catch((error) => {
				return Promise.reject(dispatch({type: TYPES.LOADING_ERROR, error}));
			});
	});
};

export const doLogin = (username, password) => (dispatch) => {
	if (username === 'test' && password === 'password') {
		return Promise.resolve(dispatch({type: TYPES.LOGIN}));
	} else {
		return Promise.reject(dispatch({type: TYPES.LOGIN_ERROR, error: new Error('account or password not match')}));
	}
};

export const doLogout = () => (dispatch) => {
	return Promise.resolve(dispatch({type: TYPES.LOGOUT}));
};
