module.exports = class Transform {
  constructor (opts) {
    this.opts = opts
    this.apply = this.apply.bind(this)
  }

  apply (compiler) {
    const transforms = (Array.isArray(this.opts)) ? this.opts : [this.opts]

    compiler.plugin('emit', function(compilation, done) {
      transforms.forEach(transform => {
        const doesRename = transform.hasOwnProperty('rename')
        const doesReplace = transform.hasOwnProperty('replace')

        Object.keys(compilation.assets)
          .filter(transform.match)
          .forEach(name => {
            let obj = compilation.assets[name]
            let src = compilation.assets[name].source()
            if (doesReplace) {
              src = transform.replace(Buffer.isBuffer(src) ? src.toString() : src)
              obj = {
                source: () => src,
                size: () => src.length
              }
            }

            if (doesRename) {
              compilation.assets[transform.rename(name, src)] = obj
              delete compilation.assets[name]
            } else {
              compilation.assets[name] = obj
            }
          })
      })

      done()
    })
  }
}
