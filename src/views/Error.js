import React from 'react';
import {Helmet} from 'react-helmet';
import {withTranslation} from 'react-i18next';

class ErrorView extends React.Component {
	render() {
		const {t} = this.props;
		return (
			<div>
				<Helmet>
					<title>Error</title>
				</Helmet>
				<div className="App-intro">
					<h1 style={{color: 'red'}}>{t('fatal_error')}</h1>
					<h2>{this.props.error.message}</h2>
				</div>
			</div>
		);
	}
}

export default withTranslation()(ErrorView);
