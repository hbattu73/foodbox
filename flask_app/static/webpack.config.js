const webpack = require('webpack');
const config = {
	entry:  __dirname + '/src/index.js',
	output: {
		path: __dirname + '/dist',
		filename: 'bundle.js',
	},
	resolve: {
		extensions: ['.js', '.jsx', '.css']
	},

	module: {
		rules: [
			{
			test: /\.(js|jsx)?/,
				exclude: /node_modules/,
				use: 'babel-loader'		
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				loader: 'file-loader',
				options: {
					publicPath: './static/dist',
				},
			},
			{ 
				test: /\.css$/, 
				use: [ 'style-loader', 'css-loader' ] 
			}			
		]
	}
};
module.exports = config;