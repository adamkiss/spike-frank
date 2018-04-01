// Transform filename from whatever/deep/path/to/name.ext to
// whatever/deep/path/to/name/index.ext for simple hosting

const index = /^((?:.*\/)?(?!index)(?:[^\/]+))\.(php|htm|html)$/i

module.exports = {
	match: name => index.test(name),
	rename: name => name.replace(index, '$1/index.$2'),
	index
}