import React from 'react';
import {Helmet} from 'react-helmet';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import actions from '../actions';
import {withRouter} from 'react-router-dom';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
		};
		this.handleLogin = this.handleLogin.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onKeyUp = this.onKeyUp.bind(this);
	}
	handleLogin() {
		this.props
			.doLogin(this.state.username, this.state.password)
			.then(() => {
				this.props.history.push('/');
			})
			.catch(() => {
				// ignore
			});
	}
	handleLogout() {
		this.props
			.doLogout()
			.then(() => {
				this.props.history.push('/');
			})
			.catch(() => {
				// ignore
			});
	}
	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value,
		});
	}
	onKeyUp(e) {
		if (e.keyCode === 13) {
			e.preventDefault();
			e.stopPropagation();
			e.nativeEvent.stopImmediatePropagation();
			this.handleLogin();
		}
		return false;
	}
	render() {
		const {isLoggedIn, t} = this.props;
		return (
			<div>
				<Helmet>
					<title>{t('login')}</title>
				</Helmet>
				{isLoggedIn ? (
					<div>
						<button onClick={this.handleLogout}>{t('logout')}</button>
					</div>
				) : (
					<div>
						Username: <input name="username" type="text" onChange={this.onChange} value={this.state.username} /> <br />
						Password: <input name="password" type="password" onKeyUp={this.onKeyUp} onChange={this.onChange} value={this.state.password} />
						<br />
						<button onClick={this.handleLogin}>{t('login')}</button>
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {isLoggedIn: state.app.isLoggedIn};
};

export default withRouter(
	connect(
		mapStateToProps,
		actions,
	)(translate()(Login)),
);
