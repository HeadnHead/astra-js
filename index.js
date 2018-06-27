require('babel-register');
require('babel-polyfill');

require('dotenv').config();

// Starting application
require('./src/bootstrap/cluster');
