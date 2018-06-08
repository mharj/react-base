
import {createStore, applyMiddleware, compose} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const persistConfig = {
	key: 'root',
	storage: storage,
};

const initialState = {
	app: {
		error: null,
		etag: null,
	}
};

const enhancers = [];

const persistedReducer = persistReducer(persistConfig, rootReducer);
if (process.env.NODE_ENV === 'development') {
	const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
	if (typeof devToolsExtension === 'function') {
		enhancers.push(devToolsExtension());
	}
}
const composedEnhancers = compose(
	applyMiddleware(thunk),
	...enhancers,
);

export default () => {
	let store = createStore(
		persistedReducer,
		initialState,
		composedEnhancers,
	);
	let persistor = persistStore(store);
	return {store, persistor};
};
