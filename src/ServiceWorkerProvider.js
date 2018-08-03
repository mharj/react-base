import React from 'react';

class ServiceWorkerProvider extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			workerState: null,
			updateFunction: null,
		};
		this.reloadCallback = this.reloadCallback.bind(this);
		this.runUpdate = this.runUpdate.bind(this);
		this.getUpdateFunction = this.getUpdateFunction.bind(this);
	}
	componentDidMount() {
		import('./registerServiceWorker' /* webpackChunkName: "register-service-worker" */)
			.then((registerServiceWorker) => registerServiceWorker.default(this.reloadCallback, this.getUpdateFunction));
	}
	reloadCallback(state) {
		this.setState({
			workerState: state,
		});
	}
	getUpdateFunction(update) {
		this.setState({
			updateFunction: update,
		});
	}
	runUpdate() {
		if (this.state.updateFunction) {
			this.state.updateFunction();
		}
	}
	render() {
		return React.cloneElement(React.Children.only(this.props.children), {workerState: this.state.workerState, swCheckUpdate: this.runUpdate});
	}
}
export default ServiceWorkerProvider;
