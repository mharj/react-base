import React from 'react';
import {Route, HashRouter as Router, Link} from 'react-router-dom';
import loadable from 'react-loadable';
import {translate} from 'react-i18next';
import logo from './logo.svg';
import './App.css';
import {connect} from 'react-redux';
import PrivateRoute from './components/PrivateRoute';

const Loading = () => <div>Loading!...</div>;

// views code split
const Home = loadable({
	loader: () => import('./views/Home' /* webpackChunkName: "home-view" */),
	loading: Loading,
});
const Login = loadable({
	loader: () => import('./views/Login' /* webpackChunkName: "login-view" */),
	loading: Loading,
});
const Secret = loadable({
	loader: () => import('./views/Secret' /* webpackChunkName: "secret-view" */),
	loading: Loading,
});

class App extends React.Component {
	render() {
		const {isLoggedIn, t, i18n} = this.props;
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to React</h1>
				</header>
				<button onClick={() => i18n.changeLanguage('fi-FI')}>{t('fin')}</button>
				<button onClick={() => i18n.changeLanguage('en-EN')}>{t('eng')}</button>
				<button onClick={() => i18n.changeLanguage('sv-SV')}>{t('sve')}</button>
				<br />
				{this.props.isLoading ? 'Fetching API data ..' : ''}
				<br />
				{this.props.error ? <h2 style={{color: 'red'}}>Error: {this.props.error.message}</h2> : null}
				<br />
				<Router>
					<div>
						<div>
							<Link to="/">
								<button>{t('home')}</button>
							</Link>
							<Link to="/login">
								<button>{t('login')}</button>
							</Link>
							<Link to="/secret" >
								<button disabled={isLoggedIn?false:true}>{t('secret')}</button>
							</Link>
						</div>
						<br />
						<Route exact={true} path="/" component={Home} />
						<Route exact={true} path="/login" component={Login} />
						<PrivateRoute isValid={isLoggedIn} failPath="/login" exact={true} path="/secret" component={Secret} />
					</div>
				</Router>

				<br />
				<b>
					Service Worker status: {this.props.workerState} <button onClick={this.props.swCheckUpdate}>Check updates</button>
				</b>
				<br />
				{process.env.NODE_ENV !== 'production' ? <pre style={{textAlign: 'left'}}>{this.props.error && this.props.error.stack}</pre> : null}
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		error: state.app.error,
		isLoading: state.app.isLoading,
		isLoggedIn: state.app.isLoggedIn,
	};
};
export default connect(mapStateToProps)(translate()(App));
