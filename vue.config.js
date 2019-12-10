const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `
            @import "@/scss/main.scss";
            `
      }
    }
  },
  configureWebpack: {
    optimization: {
      // https://github.com/webpack-contrib/terser-webpack-plugin
      minimizer: process.env.NODE_ENV === "production" ? [new TerserPlugin({ parallel: 3 })] : []
    },
    plugins: [
      // https://github.com/webpack-contrib/webpack-bundle-analyzer
      new BundleAnalyzerPlugin({ analyzerMode: "disabled", generateStatsFile: true })
    ]
  }
};
