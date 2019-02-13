import React from 'react';

const initialContext = {
	serviceWorkerState: null,
	serviceWorkerUpdate: null,
};

const WorkerContext = React.createContext(initialContext);

export const ServiceWorkerConsumer = WorkerContext.Consumer;

export function withServiceWorker(WrappedComponent) {
	return function Wrapper(props) {
		return <ServiceWorkerConsumer>{(value) => <WrappedComponent {...props} {...value} />}</ServiceWorkerConsumer>;
	};
}

export class ServiceWorkerProvider extends React.Component {
	constructor(props) {
		super(props);
		this.state = initialContext;
		this.onServiceStateChange = this.onServiceStateChange.bind(this);
		this.runUpdate = this.runUpdate.bind(this);
		this.getUpdateFunction = this.getUpdateFunction.bind(this);
	}
	componentDidMount() {
		import('./registerServiceWorker' /* webpackChunkName: "register-service-worker" */).then((registerServiceWorker) =>
			registerServiceWorker.default(this.onServiceStateChange, this.getUpdateFunction),
		);
	}
	render() {
		const contextValue = {
			serviceWorkerState: this.state.serviceWorkerState,
			serviceWorkerUpdate: this.runUpdate,
		};
		return <WorkerContext.Provider value={contextValue}>{this.props.children}</WorkerContext.Provider>;
	}
	onServiceStateChange(state) {
		this.setState({
			serviceWorkerState: state,
		});
	}
	getUpdateFunction(callback) {
		this.setState({
			serviceWorkerUpdate: callback,
		});
	}
	runUpdate() {
		if (this.state.serviceWorkerUpdate) {
			this.state.serviceWorkerUpdate();
		}
	}
}
