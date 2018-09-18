module.exports = {
	"extends": "google",
	"plugins": [
		"react",
		"jsx"
	],
	"env": {
		"es6": true,
		"node" : true,
		"jquery": true,
		"browser": true
	},
	"parserOptions": {
		"ecmaVersion": 2018,
		"sourceType": "module",
		"ecmaFeatures": {
			"jsx": true,
			"modules": true,
		}
	},
	"rules": {
		"jsx/uses-factory": [1, {"pragma": "JSX"}],
		"jsx/factory-in-scope": [0, {"pragma": "JSX"}],
		"jsx/mark-used-vars": 1,
		"jsx/no-undef": 1,
		"require-jsdoc": 0,
		"indent": ["error", "tab", {"SwitchCase": 1}],
		"no-tabs": 0,
		'max-len': [ 2, {
			code: 240,
			tabWidth: 2,
			ignoreUrls: true,
			ignoreTrailingComments: true
		}],
		'eqeqeq': "warn",
		'quotes': ["error", "single"],
		'curly': ['error', 'all'],
		'newline-per-chained-call': ['error',{ "ignoreChainWithDepth": 2 }],
		'key-spacing': ["error", {"mode": "minimum",}]
	}
};
