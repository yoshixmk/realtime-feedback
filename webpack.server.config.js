const merge = require('webpack-merge')
const path = require("path")

module.exports = env => {
  console.log('Server Build environment:', env)
  return merge(require(`./env/webpack.server.${env}.js`), {
    target: "node",
    entry: "./src/server/Server.tsx",
    output: {
      path: path.join(__dirname, "dist"),
      filename: "server.js",
    },
    devtool: "cheap-module-eval-source-map",
    resolve: {
      modules: [
        'node_modules',
        path.resolve(__dirname, "src/server"),
      ],
      extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        },
      ]
    }
  })
}
