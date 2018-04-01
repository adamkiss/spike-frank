const createHash = require('crypto').createHash
const hash = str => {
	const hash = createHash('RSA-MD5')
	hash.update(str, 'utf-8')
	return hash.digest('hex').substr(0,6)
}

const names = {}

const cssLink = /href=["']\/(.*?)([^\/]*?.css)["']/
const cssLinkReplace = (match, path, name) => {
	return `href="/${names[path+name] || path+name}"`
}

module.exports = {
	hashCss: {
		match: name => name.endsWith('.css'),
		rename: (name, src) => {
			names[name] = name.replace('.css', `.${hash(src)}.css`)
			console.log(names[name])
			return names[name]
		}
	},
	replaceCssHref: {
		match: name => name.endsWith('.html') || name.endsWith('.php'),
		replace: src => src
			.replace(cssLink, cssLinkReplace)
	}
}