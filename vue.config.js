const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
            @import "@/scss/main.scss";
            `
      }
    }
  },
  configureWebpack: {
    optimization: {
      minimizer: process.env.NODE_ENV === "production" ? [new TerserPlugin({ parallel: 3 })] : []
    },
    plugins: [new BundleAnalyzerPlugin({ analyzerMode: "disabled", generateStatsFile: true })]
  }
};
