const MarkdownIt = require('markdown-it')

const markdownOpt = {typographer: true, linkify: true}

module.exports = (opts = {}) => {
	const md = new MarkdownIt(Object.assign({}, markdownOpt, opts))

	;(opts.plugins || []).forEach(plugin => { // eslint-disable-line semi-style
		// eslint-disable-next-line no-unused-expressions
		Array.isArray(plugin) ? md.use(...plugin) : md.use(plugin)
	})

	return {
		md: md.render.bind(md),
		mdi: md.renderInline.bind(md)
	}
}
