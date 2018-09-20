import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false,
			error: null,
			location: props.history.location,
		};
	}

	componentDidCatch(error, info) {
		this.setState({
			hasError: true,
			error: error,
		});
	}
	static getDerivedStateFromProps(props, state) {
		if (props.history.location !== state.location) {
			return {
				hasError: false,
				error: null,
				location: props.history.location,
			};
		} else {
			return null;
		}
	}
	render() {
		let ErrorView = this.props.onError;
		if (this.state.hasError) {
			return <ErrorView error={this.state.error} />;
		}
		return this.props.children;
	}
}
ErrorBoundary.propTypes = {
	onError: PropTypes.func.isRequired,
};
export default withRouter(ErrorBoundary);
