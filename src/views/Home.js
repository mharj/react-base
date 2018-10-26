import React from 'react';
import {Helmet} from 'react-helmet';
import {connect} from 'react-redux';
import {withNamespaces} from 'react-i18next';
import actions from '../actions';

class Home extends React.Component {
	componentDidMount() {
		this.props.getHome();
	}
	render() {
		const {t} = this.props;
		return (
			<div>
				<Helmet>
					<title>Home</title>
				</Helmet>
				<div className="App-intro">
					To get started, edit <code>src/App.js</code> and save to reload.
					<br />
					{this.props.value ? (
						<div>
							{t('hello')} {t(this.props.value)}
						</div>
					) : null}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		value: state.app.value,
	};
};

export default connect(
	mapStateToProps,
	actions,
)(withNamespaces()(Home));
