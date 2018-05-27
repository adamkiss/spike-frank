const createHash = require('crypto').createHash
const hash = str => {
	const hash = createHash('RSA-MD5')
	hash.update(str, 'utf-8')
	return hash.digest('hex').substr(0,20)
}

const names = {}

const cssLink = /href=["']\/([0-9a-zA-Z\-\_\/]*?)([^\/]*?.css)["']/g
const cssLinkReplace = (match, path, name) => `href="/${names[path+name] || path+name}"`

module.exports = {
	hashCss: {
		match: name => name.endsWith('.css'),
		rename: (name, src) => {
			names[name] = name.replace('.css', `.${hash(src)}.css`)
			return names[name]
		}
	},
	replaceCssHref: {
		match: name => name.endsWith('.html') || name.endsWith('.php'),
		replace: src => src
			.replace(cssLink, cssLinkReplace)
	}
}
