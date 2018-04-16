import React from 'react';
import registerServiceWorker from './registerServiceWorker';

class ServiceWorkerProvider extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			workerState: null,
		};
		this.reloadCallback = this.reloadCallback.bind(this);
	}
	componentDidMount() {
		registerServiceWorker(this.reloadCallback);
	}
	reloadCallback(state) {
		this.setState({
			workerState: state,
		});
	}
	render() {
		return React.cloneElement(React.Children.only(this.props.children), {
			workerState: this.state.workerState,
		});
	}
}
export default ServiceWorkerProvider;
