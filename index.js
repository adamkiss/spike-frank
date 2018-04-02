const merge = require('lodash.mergewith')
const customizer = require('./src/utils/customizer-frank')

const isProduction = require('./src/utils/is-production')

const postcss = require('./src/postcss')
const jsStandards = require('spike-js-standards')
const reshape = require('./src/reshape')

const Transform = require('./src/spike/transform')
const transformPhp = require('./src/spike/transform-php')
const transformIndex = require('./src/spike/transform-indexify')
const transformFixDoctype = require('./src/spike/transform-fix-doctype')

const spikePage = require('./src/spike/page')

const frank = {
	// Directory settings
	root: `${__dirname}/site/`,
	dumpDirs: ['site'],
	outputDir: 'public',
	vendor: 'assets/vendor/**/*',

	// Matchers: Add SugarML, Sass
	matchers: { html: '*(**/)*.sgr', css: '*(**/)*.@(c|sa|sc)ss' },

	// Ignore magic
	ignore: [
		'*', '**/_*', '**/.*',
		'partials/**', 'assets/@(css|js)/**', 'data/**'
	],

	// Webpack rules
	module: {
		rules: [postcss.sassWebpackRule]
	},

	// Webpack devtool
	devtool: (isProduction() ? 'source-map' : false),

	postcss: postcss(),
	babel: jsStandards(),
	entry: {
		'assets/main': './assets/main.js'
	},

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

module.exports.reshape = reshape
module.exports.page = spikePage