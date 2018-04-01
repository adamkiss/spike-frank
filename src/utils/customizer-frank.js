/*
	Merge customizer for lodash.mergeWith
	Between Frank base setup and app.js
*/

module.exports = (objValue, srcValue, key, obj, src, stack) => {
	// short comparison helper: is key Y on level/indent X (1-based)?
	const keyOnLevel = (k, i) => (key === k && stack.size === i-1)
	const keyInRoot = k => keyOnLevel(k, 1)

	// Concatenate arrays by prepending app to frank
	if ((
		keyOnLevel('rules', 2) // Webpack loader rules
	) && (objValue && srcValue)) {
		return srcValue.concat(objValue)
	}

	// Concatenate arrays by appending app after frank
	if ((
		keyInRoot('dumpDirs') || keyInRoot('ignore') // Directories
	) && (objValue && srcValue)) {
		return objValue.concat(srcValue)
	}
}