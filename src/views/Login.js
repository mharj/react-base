import React from 'react';
import {Helmet} from 'react-helmet';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {withRouter} from 'react-router-dom';
import {doLogin, doLogout} from '../actions/appActions';

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
	handleLogin(e) {
		e.preventDefault();
		this.props
			.doLogin(this.state.username, this.state.password)
			.then(() => {
				this.props.history.push('/');
			})
			.catch(() => {
				// ignore
			});
	}
	handleLogout(e) {
		e.preventDefault();
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
		if (e.target && e.target.name !== undefined ) {
			switch ( e.target.name ) {
				case 'username': return this.setState({username: e.target.value});
				case 'password': return this.setState({password: e.target.value});
				default: break;
			}
		}
	}
	onKeyUp(e) {
		if (e.keyCode === 13) {
			e.preventDefault();
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
					<form>
						<button onClick={this.handleLogout}>{t('logout')}</button>
					</form>
				) : (
					<form>
						Username: <input name="username" type="text" autoComplete="username" onChange={this.onChange} value={this.state.username} /> <br />
						Password: <input name="password" type="password" autoComplete="current-password" onKeyUp={this.onKeyUp} onChange={this.onChange} value={this.state.password} />
						<br />
						<button onClick={this.handleLogin}>{t('login')}</button>
					</form>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {isLoggedIn: state.app.isLoggedIn};
};

const mapDispatchToProps = (dispatch) => ({
	doLogin: (username, password) => dispatch(doLogin(username, password)),
	doLogout: () => dispatch(doLogout()),
});

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	)(withTranslation()(Login)),
);
