// config-overrides.js
const NodePolyfillPlugin = require('node-libs-browser');

module.exports = function override(config, env) {
    config.resolve.fallback = {
        ...NodePolyfillPlugin.nodeLibs,
        timers: require.resolve('timers-browserify'),
    };
    config.plugins.push(new NodePolyfillPlugin());
    return config;
};
