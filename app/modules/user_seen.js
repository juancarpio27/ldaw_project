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

exports.searchForLike = function(callback,user_id,user_seen_id){
    db.get().query('select * from user_seen where user_id = ? and user_seen_id = ? limit 1',[user_seen_id, user_id],

    function(err,result){
        if (err){
            return callback(err,null);
        } else {
            if (result[0]){
                var values = {
                    user_id: result[0].user_id,
                    user_seen_id: result[0].user_seen_id,
                    liked: result[0].liked
                };
                return callback(null,values);
            }
            return callback(null,null);
        }
    })
};