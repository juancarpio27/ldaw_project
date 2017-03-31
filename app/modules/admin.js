var db = require('../config/db');

exports.getAdminByUsername = function (callback, username) {
    db.get().query('select * from admin where username = ? limit 1', username, function (err, result) {
        if (err) {
            return callback(err, null);
        } else {
            var admin = null;
            console.log('QUERY FINISHED',result);
            if (result[0]){
                admin = {
                    username: result[0].username,
                    password: result[0].password
                }
            }
            return callback(null, admin)
        }
    })
};