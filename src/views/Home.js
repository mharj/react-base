import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import {translate} from 'react-i18next';
import store from 'store';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = store.get('home_state') || {
			msg: '',
		}
		this.setStateStore = this.setStateStore.bind(this);
	}
	setStateStore(data) {
		let self = this;
		return new Promise( (resolve, reject) => {
			store.set('home_state', data );
			self.setState(data, resolve);
		});
	}
	componentDidMount() {
		let self = this;
		fetch('/api/hello')
			.then( (data) => data.json() )
			.then( (json) => self.setStateStore({msg: json.hello}) ) // save state to offline usage
			.catch( (err) => {
				// do something
			});
	}
	render() {
		const {t} = this.props;
		return (
			<div>
				<Helmet>
					<title>Home</title>
				</Helmet>
				<p className="App-intro">
					To get started, edit <code>src/App.js</code> and save to reload.
					<br/>
					{t('hello')} {t(this.state.msg)}
				</p>
			</div>
		);
	}
}
export default translate()(Home);
