const {modifyNodes} = require('reshape-plugin-util')

const reshapeTextObj = (location, content) => {
	return {
		content, location, type: 'text'
	}
}
const activeClass = location => reshapeTextObj(location, 'is-active')
const emptyClass = location => reshapeTextObj(location, ' ')

function isLinkTo(node) {
	return node.type === 'tag' && node.name === 'a' &&
		node.attrs && node.attrs['active-if']
}

module.exports = function reshapeActiveLinks(locals) {
	return function activeLinksPlugin(tree, opts) {
		return modifyNodes(tree, node => isLinkTo(node), node => {
			if (!node.attrs.href) { return node }

			if (node.attrs.href[0].content === node.attrs['active-if'][0].content) {
				if (!node.attrs.class) { node.attrs.class = [] }
				if (node.attrs.class.length !== 0) {
					node.attrs.class.push(emptyClass(node.location))
				}
				node.attrs.class.push(activeClass(node.location))
			}

			// delete node.attrs['active-if']
			return node
		})
	}
}
