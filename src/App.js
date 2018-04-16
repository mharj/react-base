import React, { Component } from 'react';
import {
	Route,
	Switch,
	HashRouter as Router,
} from 'react-router-dom';
import {translate} from 'react-i18next';
import logo from './logo.svg';
import './App.css';
import Home from './views/Home';
import {connect} from 'react-redux';

class App extends Component {
	constructor(props) {
		super(props);
		this.onLanguageChange = this.onLanguageChange.bind(this);
	}
	onLanguageChange(lng) {
		this.props.i18n.changeLanguage(lng);
	}
	render() {
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
					<Switch>
						<Route exact path='/' component={Home}/>
					</Switch>
				</Router>
				<b>Service Worker status: {this.props.workerState}</b>
				{process.env.NODE_ENV !== "production"?
					<code>
						{this.props.error && this.props.error.stack}
					</code>
				:null}
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		error: state.base.error,
		isLoading: state.base.isLoading,
	};
};
export default connect(mapStateToProps)(translate()(App));

