import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import * as actions from '../actions/base';


class Home extends Component {
	componentDidMount() {
		this.props.getHome(this.props.etag);
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
					<br/>
					{this.props.value?
						<div>
							{t('hello')} {t(this.props.value)}
						</div>
					:null}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		value: state.base.value,
		etag: state.base.etag,
	};
};

export default connect(mapStateToProps, actions)(translate()(Home));
