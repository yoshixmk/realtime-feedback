// webpack prod設定

module.exports = {
  mode: 'production', // "production" | "development" | "none"

  // mute warning message
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
};
