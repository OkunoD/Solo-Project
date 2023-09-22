module.exports = {
    verbose: false,
    clearMocks: true,
    collectCoverage: false,
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest"
    },
    globals: {
      TextEncoder: require('util').TextEncoder,
      TextDecoder: require('util').TextDecoder,
    },
};