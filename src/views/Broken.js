import React from 'react';

class Broken extends React.Component {
	componentDidMount() {
		throw new Error('Broken: something got broken');
	}
	render() {
		return <div />;
	}
}

export default Broken;
