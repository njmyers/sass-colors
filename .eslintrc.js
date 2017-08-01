module.exports = {
	"root": true,
	"env": {
		"browser": true,
		"node": true,
		"mocha": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:import/errors",
		"plugin:import/warnings",
		],
	"parserOptions": {
		"sourceType": "module",
		"ecmaVersion": 7
	},
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"single"
		],
		"semi": [
			"error",
			"always"
		],
		"no-console": 0
	}
};