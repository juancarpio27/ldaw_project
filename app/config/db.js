var mysql = require('mysql');
var async = require('async');
var credentials = require('./credentials');

var state = {
    pool: null
};

exports.connect = function(done) {
    state.pool = mysql.createPool(credentials.db_development);
    done();
};

exports.get = function() {
    return state.pool;
};
