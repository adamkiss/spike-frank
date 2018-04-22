const sugarml = require('sugarml')
const htmlParser = require('reshape-parser')

const smartypants = require('retext-smartypants')
const expressions = require('reshape-expressions')
const content = require('reshape-content')
const include = require('reshape-include')
const layouts = require('reshape-layouts')
const retext = require('reshape-retext')
const beautify = require('reshape-beautify')
const minify = require('reshape-minify')
const evalCode = require('reshape-eval-code')

const merge = require('lodash.merge')
const isProduction = require('../utils/is-production')

const markdown = require('./markdown')
const php = require('./plugin-php.js')
const activeLinks = require('./plugin-active-links.js')

/**
 * Primary export. For all options see: https://github.com/reshape/standard
 */
module.exports = function reshapeStandard(options = {}) {
	if (!options.root) options.root = '.'

	// add options for expressions, layouts, and includes if present
	const expressionsOpt = selectKeys(options, ['delimiters', 'unescapeDelimiters'])
	const layoutsOpt = selectKeys(options, ['root'])
	const includeOpt = selectKeys(options, ['root', 'alias', 'parserRules'])

	merge(includeOpt, {
		parserRules: [
			{test: /\.sgr$/, parser: sugarml},
			{test: /\.html?$/, parser: htmlParser}
		]
	})

	// Always return an object for locals
	if (typeof options.locals === 'undefined') options.locals = {}

	// If the user has not overridden the default markdown function, initialize
	// markdown-it and add the default
	const contentOpt = options.content || {}
	if (!contentOpt.md) Object.assign(contentOpt, markdown(options.markdown || {}))

	// add all the default plugins with their options
	const plugins = [
		layouts(layoutsOpt),
		include(includeOpt),
		expressions(expressionsOpt),
		// eval code here if it's a static view so that locals can be
		// processed by content, retext, minifier, etc
		...Array.prototype.concat(options.pluginsPreEval || []),
		evalCode(options.locals),
		activeLinks(), php(),
		...Array.prototype.concat(options.pluginsPostEval || []),
		content(contentOpt),
		retext(options.retext || smartypants)
	]

	// append and prepend plugins if needed
	if (options.pluginsPost) plugins.push(...Array.prototype.concat(options.pluginsPost))
	if (options.pluginsPre)	plugins.unshift(...Array.prototype.concat(options.pluginsPre))

	// append the minify or beautify formatting plugin (always last)
	if (isProduction())
		plugins.push(minify(typeof options.minify === 'object' ? options.minify : {}))
	else
		plugins.push(beautify())

	return {
		parser: sugarml,
		locals: options.locals,
		filename: options.filename,
		multi: options.multi,
		plugins
	}
}

/**
 * Given an options object and an array of key names, return an object filtered
 * to contain only the keys in the optNames array, if they exist on the options
 * object.
 * @param  {Object} opts - full options object
 * @param  {Array} optNames - keys to filter
 * @return {Object} object filtered for the specific keys
 */
function selectKeys(opts, optNames) {
	return optNames.reduce((m, opt) => {
		if (typeof opts[opt] !== 'undefined') m[opt] = opts[opt]
		return m
	}, {})
}
