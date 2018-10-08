module.exports = {
	preset: 'react-native',
	transformIgnorePatterns: [
		'node_modules/(?!(react-native|my-project|redux-persist|react-native-linear-gradient|react-native-vector-icons|react-navigation)/)',
	],
};
