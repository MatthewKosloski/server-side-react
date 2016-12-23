// Require Babel so we can use es6 in the server.js file
require('babel-register');

// Require constants file
var constants = require('./constants');

// CSS require hook
require('css-modules-require-hook')({
    extensions: ['.scss'],
    preprocessCss: (data, filename) =>
        require('node-sass').renderSync({
            data,
            file: filename
        }).css,
    camelCase: false,
    generateScopedName: constants.LOCAL_IDENT_NAME
});

require('./server');