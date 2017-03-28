var db = require('../config/db');

exports.createUserSeen = function(callback,user_id,user_seen_id,liked){
    var values = {
        user_id: user_id,
        user_seen_id: user_seen_id,
        liked: liked
    };
    db.get().query('insert into user_seen SET ?',values,
        function (err, result) {
            if (err){
                return callback(err,null);
            }else {
                values['id'] = result.insertId;
                return callback(null,values);
            }
        })
};