// webpack.config.js
const NodePolyfillPlugin = require('node-libs-browser');

module.exports = {
    // other webpack configurations...

    resolve: {
        fallback: {
            ...require('node-libs-browser').fallbacks,
            timers: require.resolve('timers-browserify'),
        },
    },
    plugins: [
        new NodePolyfillPlugin(),
        // other plugins...
    ],
};
