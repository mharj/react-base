import React from 'react';
import {Helmet} from 'react-helmet';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {getHome} from '../actions/appActions';

class Home extends React.Component {
	componentDidMount() {
		this.props.getHome().then(() => {
			console.log('async promise done');
		});
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

const mapDispatchToProps = (dispatch) => ({
	getHome: () => dispatch(getHome()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(withTranslation()(Home));
