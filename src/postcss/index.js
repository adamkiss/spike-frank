const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')

const isProduction = require('../utils/is-production')

module.exports = () => {
	return {
		plugins: isProduction() ?
			[autoprefixer(), cssnano()] :
			[autoprefixer()]
	}
}

module.exports.sassWebpackRule = {
	test: /\.s[ac]ss/,
	use: [{ loader: 'sass-loader' }]
}