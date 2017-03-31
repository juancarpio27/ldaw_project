var db = require('../config/db');

function match(id,user_a_id,user_b_id){
	this.id = id;
	this.user_a_id = user_a_id;
    this.user_b_id = user_b_id;
}

exports.createMatch = function(callback,user_a_id,user_b_id){
    var values = {
        user_a_id: user_a_id,
        user_b_id: user_b_id
    };
    db.get().query('insert into matches SET ?',values,
        function (err, result) {
            if (err){
                return callback(err,null);
            }else {
                values['id'] = result.insertId;
                return callback(null,values);
            }
        })
};

exports.getMatches = function(callback,user_id){
    db.get().query('select * from matches where user_a_id = ? union select * from matches where user_b_id = ?',[user_id,user_id],
        function (err, result) {
            if (err){
                return callback(err,null);
            }else {
                var matches = [];
                for (var i =0; i < result.length; ++i){
                    var match = {
                        user_a_id: result[i].user_a_id,
                        user_b_id: result[i].user_b_id
                    };
                    matches.push(match);
                }
                return callback(null,matches);
            }
        })
};

exports.deleteMatch = function(callback,user_id,user_b_id){
    db.get().query('delete from matches where (user_a_id = ? and user_b_id = ?) or (user_a_id = ? and user_b_id = ?)',
    [user_id,user_b_id,user_b_id,user_id],function(err,result){
        if (err){
            return callback(err,null);
        }
            return callback(null,true);
        })
};

exports.removeMatch = function(callback,id){
    db.get().query('delete from matches where id=?',
        id,function(err,result){
            if (err){
                return callback(err,null);
            }
            return callback(null,true);
        })
};
