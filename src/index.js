import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import {I18nextProvider} from 'react-i18next';
import i18n from './i18n';
import './index.css';
import App from './App';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {Provider} from 'react-redux';
import ServiceWorkerProvider from './ServiceWorkerProvider';
import configureStore from './configureStore';
import('babel-polyfill');
import('whatwg-fetch');
let {store, persistor} = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<I18nextProvider i18n={i18n}>
				<ServiceWorkerProvider>
					<App />
				</ServiceWorkerProvider>
			</I18nextProvider>
		</PersistGate>
	</Provider>,
	document.getElementById('root'),
);
