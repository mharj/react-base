import {GLOBAL_TYPES} from '../reducers';

// dispatcher actions
const doRestAction = () => {
	return {type: GLOBAL_TYPES.RESET};
};

// async functions
/**
 * reset redux to initial state
 * @return {Promise<Action>}
 */
export const doReset = () => (dispatch) => {
	return Promise.resolve(dispatch(doRestAction()));
};
