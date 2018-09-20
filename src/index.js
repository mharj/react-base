import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import {I18nextProvider} from 'react-i18next';
import './index.css';
import App from './App';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {Provider} from 'react-redux';
import ServiceWorkerProvider from './ServiceWorkerProvider';

Promise.all([
	import('./configureStore' /* webpackChunkName: "configurestore" */),
	import('./i18n' /* webpackChunkName: "i18n" */),
	import('babel-polyfill' /* webpackChunkName: "polyfill" */),
	import('cross-fetch/polyfill' /* webpackChunkName: "fetch" */),
])
	.then( (loaded) => {
		const [configureStore, i18n] = loaded;
		let {store, persistor} = configureStore.default();
		ReactDOM.render(
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<I18nextProvider i18n={i18n.default}>
						<ServiceWorkerProvider>
							<App />
						</ServiceWorkerProvider>
					</I18nextProvider>
				</PersistGate>
			</Provider>,
			document.getElementById('root'),
		);
	});

