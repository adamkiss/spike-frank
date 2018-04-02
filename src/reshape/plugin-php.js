const {modifyNodes} = require('reshape-plugin-util')

function isPhpNode (node) {
  return node.type === 'tag' && node.name === 'php'
}

module.exports = function reshapePhp (options = {}) {
  return function phpPlugin(tree) {
    return modifyNodes(tree, node => isPhpNode(node), node => {
      // Mark every node as skipped by attrs
      if (!node.hasOwnProperty('attrs')) {
        node.attrs = {'retext-skip': []}
      } else {
        node.attrs['retext-skip'] = []

        // switch <php e> attr to <php echo>
        if (node.attrs.e) {
          node.attrs.echo = []
          delete node.attrs.e
        }
      }

      // Return
      return node
    })
  }
}
