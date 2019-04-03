// webpack dev設定

module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: 'development', // "production" | "development" | "none"

  // webpack-dev-server
  devServer: {
    host: '0.0.0.0',
    port: 4000,
    contentBase: 'dist/server/',
    hot: true,
  }
};
