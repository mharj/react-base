import React, { Component } from 'react';
import {
	Route,
	HashRouter as Router,
	Link
} from 'react-router-dom';
import Loadable from 'react-loadable';
import {translate} from 'react-i18next';
import logo from './logo.svg';
import './App.css';
import {connect} from 'react-redux';
import PrivateRoute from './components/PrivateRoute';

const Loading = () => <div>Loading!...</div>;

// views code split
const Home = Loadable({
	loader: () => import('./views/Home'),
	loading: Loading,
});
const Login = Loadable({
	loader: () => import('./views/Login'),
	loading: Loading,
});
const Secret = Loadable({
	loader: () => import('./views/Secret'),
	loading: Loading,
});

class App extends Component {
	constructor(props) {
		super(props);
		this.onLanguageChange = this.onLanguageChange.bind(this);
		this.checkLogin = this.checkLogin.bind(this);
	}
	onLanguageChange(lng) {
		this.props.i18n.changeLanguage(lng);
	}
	checkLogin() {
		return this.props.username === 'test' && this.props.password === 'password';
	}
	render() {
		const {isLoggedIn} = this.props;
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to React</h1>
				</header>
				<button onClick={()=>this.onLanguageChange('fi-FI')}>Suomi</button>
				<button onClick={()=>this.onLanguageChange('en-EN')}>English</button>
				<button onClick={()=>this.onLanguageChange('sv-SV')}>Svenska</button>
				<br/>
				{this.props.isLoading?'Fetching API data ..':''}<br/>
				{this.props.error?<h2 style={{color: 'red'}}>Error: {this.props.error.message}</h2>:null}<br/>
				<Router>
					<div>
						<div>
							<Link to='/'><button>Home</button></Link>
							<Link to='/login'><button>Login</button></Link>
							<Link to='/secret'><button>Secret</button></Link>
						</div>
						<br/>
						<Route exact={true} path='/' component={Home}/>
						<Route exact={true} path='/login' component={Login}/>
						<PrivateRoute isValid={isLoggedIn} failPath="/login" exact={true} path='/secret' component={Secret} />
					</div>
				</Router>

				<br/>
				<b>Service Worker status: {this.props.workerState} <button onClick={this.props.swCheckUpdate}>Check updates</button></b>
				<br/>
				{process.env.NODE_ENV !== "production"?
					<pre style={{textAlign: 'left'}}>
						{this.props.error && this.props.error.stack}
					</pre>
				:null}
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

