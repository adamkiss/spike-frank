const {modifyNodes} = require('reshape-plugin-util')

const reshapeTextObj = (location, content) => {
	return {
		content, location, type: 'text'
	}
}
const activeClass = location => reshapeTextObj(location, 'is-active')
const emptyClass = location => reshapeTextObj(location, ' ')

function getCurrentPage(locals = false) {
	if (!locals || (!locals.page && !locals.item)) { return ':)' }

	return locals.item ? locals.item.page.url : locals.page.url
}

function isLinkTo(node) {
	return node.type === 'tag' && node.name === 'a'
}

module.exports = function reshapeLinkTo (locals) {
	return function linkToPlugin (tree, opts) {
		// const current = getCurrentPage(locals)
		const current = ":("

		return modifyNodes(tree, node => isLinkTo(node), node => {
			if (!node.attrs) { node.attrs = {} }
			node.name = 'a'

			if (!node.attrs.href || node.attrs.href !== current) { return node }

			if (!node.attrs.class) { node.attrs.class = [] }
			if (node.attrs.class.length === 0) {
				node.attrs.class.push(emptyClass(node.location))
			}
			node.attrs.class.push(activeClass(node.location))
			return node
		})
	}
}
