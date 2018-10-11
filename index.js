const merge = require('lodash.mergewith')
const jsStandards = require('spike-js-standards')
const postcss = require('./src/postcss')
const reshape = require('./src/reshape')

const customizer = require('./src/utils/customizer-frank')
const isProduction = require('./src/utils/is-production')

const Transform = require('./src/spike/transform')
const transformPhp = require('./src/spike/transform-php-with-entities')
const transformIndex = require('./src/spike/transform-indexify')
const transformFixDoctype = require('./src/spike/transform-fix-doctype')

const markdown = require('./src/reshape/markdown')

const spikePage = require('./src/spike/page')

const frank = {
	// Directory settings
	root: `${__dirname}/site/`,
	dumpDirs: ['site'],
	outputDir: 'public',
	vendor: 'assets/vendor/**/*',

	// Matchers: Add SugarML, Sass
	matchers: {html: '*(**/)*.sgr', css: '*(**/)*.@(c|sa|sc)ss'},

	// Ignore magic
	ignore: [
		'*', '**/_*', '**/.DS_Store',
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

Object.assign(module.exports, {
	isProduction,
	reshape, jsStandards, postcss,
	markdown,
	page: spikePage
})
