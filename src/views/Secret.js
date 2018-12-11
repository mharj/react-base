import React from 'react';
import {Helmet} from 'react-helmet';
import {withNamespaces} from 'react-i18next';

class Secret extends React.Component {
	constructor(props) {
		super(props);
		const debug = {hello: 'world'};
		this.dataBlob = new Blob([JSON.stringify(debug, null, 2)], {type: 'application/json'});
	}
	render() {
		return (
			<div>
				<Helmet>
					<title>Secret</title>
				</Helmet>
				<div>some secret stuff</div>
				<a href={URL.createObjectURL(this.dataBlob)} download={'debug.json'}>Download</a>
			</div>
		);
	}
}

export default withNamespaces()(Secret);
