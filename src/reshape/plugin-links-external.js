const {modifyNodes} = require('reshape-plugin-util')

const reshapeAttributeObject = (location, content) => {
	return {
		content, location, type: 'text'
	}
}

function isExternal(node) {
	return node.type === 'tag' && node.name === 'a' &&
		node.attrs && (node.attrs['external'] || node.attrs['external-norefer'])
}

module.exports = function reshapeActiveLinks(locals) {
	return function activeLinksPlugin(tree, opts) {
		return modifyNodes(tree, node => isExternal(node), node => {
			Object.assign(node.attrs, {
				target: [
					reshapeAttributeObject(
						node.location,
						'_blank'
					)
				],
				rel: [
					reshapeAttributeObject(
						node.location,
						node.attrs.external ? 'noopener' : 'noreferrer'
					)
				]
			})

			if (node.attrs.external)
				delete node.attrs.external
			else if (node.attrs['external-norefer'])
				delete node.attrs['external-norefer']

			return node
		})
	}
}
