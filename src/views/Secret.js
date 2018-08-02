import React from 'react';
import {Helmet} from 'react-helmet';
import {translate} from 'react-i18next';

class Secret extends React.Component {
	render() {
		return (
			<div>
				<Helmet>
					<title>Secret</title>
				</Helmet>
				<div>some secret stuff</div>
			</div>
		);
	}
}

export default translate()(Secret);
