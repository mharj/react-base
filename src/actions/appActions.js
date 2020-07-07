import {ACTION_TYPES as TYPES} from '../reducers/appReducer';

// actions
export const appLoading = (isLoading) => {
	return {type: TYPES.APP_LOADING, isLoading};
};

export const appError = (error) => {
	return {type: TYPES.APP_ERROR, error};
};

export const appLogin = (isLoggedIn) => {
	return {type: TYPES.APP_LOGIN, isLoggedIn};
};

export const appData = (value, etag) => {
	return {type: TYPES.APP_DATA, value, etag};
};

// demo helper
const delay = (duration) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, duration);
	});
};

// async actions
/**
 * getHome
 * @return {Promise<Action>}
 */
export const getHome = () => (dispatch, getState) => {
	const {
		app: {etag},
	} = getState();
	dispatch(appLoading(true));
	//  ajax delay 1sec
	const headers = {};
	if (etag) {
		headers['if-none-match'] = etag;
	}
	return delay(1000).then(() => {
		return fetch('/api/hello', {headers})
			.then((response) => {
				dispatch(appLoading(false));
				let etag = null;
				if (response.status === 304) {
					return Promise.resolve();
				} else if (response.status !== 200 ) {
					return Promise.reject(dispatch(appError(new Error('http error '+response.status))));
				} else {
					if (response.headers.has('ETag')) {
						etag = response.headers.get('ETag').replace(/"/g, '');
					}
					return response.json().then((json) => {
						if (json && json.hello) {
							return Promise.resolve(dispatch(appData(json.hello, etag)));
						}
					});
				}
			})
			.catch((error) => {
				return Promise.reject(dispatch(appError(error)));
			});
	});
};

/**
 * doLogin
 * @param {string} username
 * @param {string} password
 * @return {Promise<Action>}
 */
export const doLogin = (username, password) => (dispatch) => {
	if (username === 'test' && password === 'password') {
		return Promise.resolve(dispatch(appLogin(true)));
	} else {
		return Promise.reject(dispatch(appError(new Error('account or password not match'))));
	}
};

/**
 * doLogout
 * @return {Promise<Action>}
 */
export const doLogout = () => (dispatch) => {
	return Promise.resolve(dispatch(appLogin(false)));
};
