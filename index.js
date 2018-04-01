const merge = require('lodash.mergewith')
const customizer = require('./src/customizer')

const postcss = require('./src/postcss')
const jsStandards = require('spike-js-standards')

const frank = {
	// Directory settings
	root: `${__dirname}/site/`,
	dumpDirs: ['site'],
	outputDir: 'public',
	vendor: 'assets/vendor/**/*',

	// Ignore magic
	ignore: ['*', '**/_*', '**/.*', 'partials/**'],

	// Webpack rules
	module: {
		rules: [postcss.sassWebpackRule]
	},

	postcss: postcss(),
	babel: jsStandards()
}

module.exports = opts => {
	merge(frank, opts, customizer)
	// console.log(frank.ignore)
	return frank
}