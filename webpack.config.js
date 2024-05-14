const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = {
	entry: "./public/client.js", // Entry point
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
	module: {
		rules: [
			{
				test: /\.css$/, // For .css files
				use: ["style-loader", "css-loader"], // Process CSS files
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./public/index.html", // Copy and minify HTML
		}),
		new CopyWebpackPlugin({
			patterns: [
				{ from: "./public/favicon.ico", to: "favicon.ico" }, // Copy favicon
				{ from: "./public/style.css", to: "style.css" }, // Ensure CSS is copied
				{ from: "./public/script.js", to: "script.js" }, // Ensure CSS is copied
			],
		}),
	],
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		port: 9000,
	},
}
