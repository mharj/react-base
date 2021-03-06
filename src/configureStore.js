
import {createStore, applyMiddleware, compose} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import {rootReducer, initialState} from './reducers';

const persistConfig = {
	key: 'root',
	storage: storage,
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
	const store = createStore(
		persistedReducer,
		initialState,
		composedEnhancers,
	);
	const persistor = persistStore(store);
	return {store, persistor};
};
