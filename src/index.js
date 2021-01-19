import 'react-app-polyfill/ie9';
import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import {I18nextProvider} from 'react-i18next';
import './index.css';
import App from './App';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {Provider} from 'react-redux';
import {ServiceWorkerProvider} from './ServiceWorkerProvider';

Promise.all([
	import('./configureStore' /* webpackChunkName: "configurestore", webpackPreload: true */),
	import('./i18n' /* webpackChunkName: "i18n" */),
	import('./reportWebVitals' /* webpackChunkName: "web-vitals", webpackPreload: true */),
	import('cross-fetch/polyfill' /* webpackChunkName: "fetch", webpackPreload: true */),
])
	.then( (loaded) => {
		const [configureStore, i18n, reportWebVitals] = loaded;
		const {store, persistor} = configureStore.default();
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
		// If you want to start measuring performance in your app, pass a function
		// to log results (for example: reportWebVitals.default(console.log))
		// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
		reportWebVitals.default();
	});

