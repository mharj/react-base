import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import App from './App';
import renderer from 'react-test-renderer';
import configureStore from './configureStore';
import {I18nextProvider} from 'react-i18next';
import i18n from './i18nForTests';
import {PersistGate} from 'redux-persist/es/integration/react';
import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';
import ServiceWorkerProvider from './ServiceWorkerProvider';
let {store, persistor} = configureStore();
const mockStore = configureMockStore([]);

jest.mock('react-i18next', () => ({
	translate: () => (Component) => (props) => <Component t={() => ''} {...props} />,
}));

it('renders without crashing', () => {
	const div = document.createElement('div');
	const elem = ReactDOM.render(
		<Provider store={mockStore}>
			<PersistGate loading={null} persistor={persistor}>
				<I18nextProvider i18n={i18n}>
					<ServiceWorkerProvider>
						<App />
					</ServiceWorkerProvider>
				</I18nextProvider>
			</PersistGate>
		</Provider>,
		div,
	);
	ReactDOM.unmountComponentAtNode(div);
});

test('component rendering', () => {
	const component = renderer.create(<Provider store={mockStore}>
		<PersistGate loading={null} persistor={persistor}>
			<I18nextProvider i18n={i18n}>
				<ServiceWorkerProvider>
					<App />
				</ServiceWorkerProvider>
			</I18nextProvider>
		</PersistGate>
	</Provider>);
	let tree = component.toJSON();
});
