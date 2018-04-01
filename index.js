const merge = require('lodash.mergewith')
const customizer = require('./src/customizer')

const isProduction = require('./src/utils/is-production')

const postcss = require('./src/postcss')
const jsStandards = require('spike-js-standards')

const Transform = require('./src/spike/transform')
const transformPhp = require('./src/spike/transform-php')
const transformIndex = require('./src/spike/transform-indexify')
const transformFixDoctype = require('./src/spike/transform-fix-doctype')

const frank = {
	// Directory settings
	root: `${__dirname}/site/`,
	dumpDirs: ['site'],
	outputDir: 'public',
	vendor: 'assets/vendor/**/*',

	// Matchers: Add SugarML, Sass
	matchers: { html: '*(**/)*.sgr', css: '*(**/)*.s(a|c)ss' },

	// Ignore magic
	ignore: ['*', '**/_*', '**/.*', 'partials/**'],

	// Webpack rules
	module: {
		rules: [postcss.sassWebpackRule]
	},

	// Webpack devtool
	devtool: (isProduction() ? 'source-map' : false),

	postcss: postcss(),
	babel: jsStandards(),

	// plugins after spike
	afterSpikePlugins: [new Transform([
		transformPhp, transformIndex, transformFixDoctype
	])]
}

module.exports = opts => {
	merge(frank, opts, customizer)
	// console.log(frank.ignore)
	return frank
}

module.exports.isProduction = isProduction