import {applyMiddleware, createStore} from 'redux';
import {persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import {resetStore, storage} from '../src/lib/testStore';
import {initialState, rootReducer} from './reducers';

const persistConfig = {
	key: 'test_store',
	storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const createTestStore = () => {
	resetStore();
	return createStore(persistedReducer, initialState, applyMiddleware(thunk));
};
