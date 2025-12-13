const TerserPlugin = require('terser-webpack-plugin') // Для тонкой настройки Terser
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
	mode: 'production',
	// optimization: {
	// 	minimize: true, // Включить минификацию
	// 	minimizer: [
	// 		new TerserPlugin(),
	// 		new CssMinimizerPlugin(), // Подключаем минификатор CSS
	// 	],
	// },
	devtool: false,
}
