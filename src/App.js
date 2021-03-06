import React from 'react';
import {Switch, Route, HashRouter as Router, Link} from 'react-router-dom';
import loadable from 'react-loadable';
import {withTranslation} from 'react-i18next';
import logo from './logo.svg';
import './App.css';
import {connect} from 'react-redux';
import PrivateRoute from './components/PrivateRoute';
import ErrorBoundary from './components/ErrorBoundary';
import {withServiceWorker} from './ServiceWorkerProvider';
import ErrorView from './views/Error';

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
const Broken = loadable({
	loader: () => import('./views/Broken' /* webpackChunkName: "broken-view" */),
	loading: Loading,
});

class App extends React.Component {
	constructor(props) {
		super(props);
		this.handleLanguageChange = this.handleLanguageChange.bind(this);
	}
	handleLanguageChange(event) {
		this.props.i18n.changeLanguage(event.target.value);
	}
	render() {
		const {isLoggedIn, t} = this.props;
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to React</h1>
				</header>
				<button value="fi-FI" onClick={this.handleLanguageChange}>
					{t('fin')}
				</button>
				<button value="en-EN" onClick={this.handleLanguageChange}>
					{t('eng')}
				</button>
				<button value="sv-SV" onClick={this.handleLanguageChange}>
					{t('sve')}
				</button>
				<br />
				{this.props.isLoading ? 'Fetching API data ..' : ''}
				<br />
				{this.props.error ? <h2 style={{color: 'red'}}>Error: {this.props.error.message}</h2> : null}
				<br />
				<Router>
					<div>
						<ErrorBoundary onError={ErrorView}>
							<div>
								<Link to="/">
									<button>{t('home')}</button>
								</Link>
								<Link to="/login">
									<button>{t('login')}</button>
								</Link>
								<Link to="/secret">
									<button disabled={isLoggedIn ? false : true}>{t('secret')}</button>
								</Link>
								<Link to="/broken">
									<button>{t('broken')}</button>
								</Link>
							</div>
							<br />
							<Switch>
								<Route exact={true} path="/" component={Home} />
								<Route exact={true} path="/login" component={Login} />
								<PrivateRoute isValid={isLoggedIn} failPath="/login" exact={true} path="/secret" component={Secret} />
								<Route exact={true} path="/broken" component={Broken} />
							</Switch>
						</ErrorBoundary>
					</div>
				</Router>

				<br />
				<b>
					Service Worker status: {this.props.serviceWorkerState} <button onClick={this.props.serviceWorkerUpdate}>Check updates</button>
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
export default connect(mapStateToProps)(withTranslation()(withServiceWorker(App)));
