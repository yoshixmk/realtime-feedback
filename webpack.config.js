// webpack 共通設定
const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = env => {
  console.log('Build environment:', env);
  return merge(require(`./env/webpack.${env}.js`), {
    // メインとなるJavaScriptファイル（エントリーポイント）
    entry: './src/frontend/index.tsx',

    output: {
      path: path.join(__dirname, "dist"),
      filename: 'index.js'
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
      })
    ],

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader"},
      ]
    },

    resolve: {
      modules: [
        'node_modules',
        path.resolve(__dirname, "src/frontend"),
      ],
      extensions:
        ['.tsx', '.ts', '.js']
    }
  });
};
