const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    webpack: {
        configure: (webpackConfig) => {
            // Add timers polyfill
            webpackConfig.resolve.fallback = {
                ...webpackConfig.resolve.fallback,
                timers: require.resolve('timers-browserify'),
                stream: require.resolve('stream-browserify'),
            };

            // Add webpack's ProvidePlugin to provide global packages
            webpackConfig.plugins.push(
                new webpack.ProvidePlugin({
                    process: 'process/browser',
                })
            );

            webpackConfig.plugins.push(
                new HtmlWebpackPlugin({
                  template: 'public/index.html',
                })
              );

            return webpackConfig;
        },
    },
};
