import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import actions from '../actions';
import {withRouter} from 'react-router-dom';


class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
		}
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onKeyUp = this.onKeyUp.bind(this);
	}
	onSubmit() {
		this.props.doLogin(this.state.username, this.state.password)
			.then(() => {
				this.props.history.push('/');
			})
			.catch( () => {
				// ignore
			});
	}
	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value,
		})
	}
	onKeyUp(e) {
		if (e.keyCode === 13) {
			e.preventDefault();
			e.stopPropagation();
			e.nativeEvent.stopImmediatePropagation();
			this.onSubmit();
		}
		return false;
	}
	render() {
		return (
			<div>
				<Helmet>
					<title>Login</title>
				</Helmet>
				<div>
					Username: <input name='username' type="text" onChange={this.onChange} value={this.state.username} /> <br/>
					Password: <input name='password' type="password" onKeyUp={this.onKeyUp} onChange={this.onChange} value={this.state.password} />
					<br/>
					<button onClick={this.onSubmit}>Login</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

export default withRouter(connect(mapStateToProps, actions)(translate()(Login)));
