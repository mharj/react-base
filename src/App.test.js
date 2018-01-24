import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import renderer from 'react-test-renderer';

jest.mock('react-i18next', () => ({
	translate: () => Component => props => <Component t={() => ''} {...props} />,
}));

it('renders without crashing', () => {
	const div = document.createElement('div');
	const elem = ReactDOM.render(<App />, div);
	ReactDOM.unmountComponentAtNode(div);
});

test('component rendering', () => {
	const component = renderer.create(
		<App />,
	);
	let tree = component.toJSON();
});
