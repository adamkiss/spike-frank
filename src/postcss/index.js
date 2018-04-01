const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')

module.exports = () => {
	return {
		plugins: process.env.SPIKE_ENV === 'production' ?
			[autoprefixer(), cssnano()] :
			[autoprefixer()]
	}
}

module.exports.sassWebpackRule = {
	test: /\.s[ac]ss/,
	use: [{ loader: 'sass-loader' }]
}