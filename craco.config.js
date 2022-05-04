const CopyPlugin = require("copy-webpack-plugin");

module.exports = () => {
  return {
    webpack: {
      configure: (webpackConfig, { env, paths }) => {
        return {
          ...webpackConfig,
          plugins: [
            ...webpackConfig.plugins,
            // Copy plugin to copy manifest.json from src to build
            new CopyPlugin({
              patterns: [{ from: "./src/manifest.json" }],
            }),
          ],
          // Add extra entry points...
          entry: {
            // Standard entry point
            main: paths.appIndexJs,
            // Misc service_worker script, as an additional entry point
            content: {
              import: "./src/service_worker.ts",
              filename: "./service_worker.js",
            },
          },
          optimization: {
            ...webpackConfig.optimization,
            runtimeChunk: false,
          },
        };
      },
    },
  };
};
