import {ACTION_TYPES as TYPES} from '../reducers/appReducer';

export const getHome = (etag) => (dispatch) => {
	dispatch({type: TYPES.LOADING});
	setTimeout(() => {
		//  ajax delay 1sec
		let headers = {};
		if (etag) {
			headers['if-none-match'] = etag;
		}
		fetch('/api/hello', {headers: headers})
			.then((response) => {
				let etag = null;
				if (response.status === 304) {
					return null;
				} else {
					if (response.headers.has('ETag')) {
						etag = response.headers.get('ETag').replace(/"/g, '');
					}
					return response.json().then((json) => {
						return {etag, json};
					});
				}
			})
			.then((data) => {
				if (data) {
					const {etag, json} = data;
					if (json && json.hello) {
						dispatch({type: TYPES.LOADING_DONE, value: json.hello, etag: etag});
					} else {
						throw new Error('no value found!');
					}
				} else {
					dispatch({type: TYPES.LOADING_NO_CHANGE});
				}
			})
			.catch((error) => {
				dispatch({type: TYPES.LOADING_ERROR, error});
			});
	}, 1000);
};

export const doLogin = (username, password) => (dispatch) => {
	if ( username === 'test' && password === 'password') {
		return Promise.resolve( dispatch({type: TYPES.LOGIN}) );
	} else {
		return Promise.reject( dispatch({type: TYPES.LOGIN_ERROR, error: new Error('account or password not match')}) );
	}
};

export const doLogout = () => (dispatch) => {
	return Promise.resolve( dispatch({type: TYPES.LOGOUT}) );
};
