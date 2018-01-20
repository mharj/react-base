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
				<Router>
					<Switch>
						<Route exact path='/' component={Home}/>
					</Switch>
				</Router>
			</div>
		);
	}
}

export default translate()(App);

