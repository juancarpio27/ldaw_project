var db = require('../config/db');

function user_like(id,user_id,category_id){
	this.id = id;
	this.user_id = user_id;
    this.category_id = category_id;
}

exports.createUserLike = function(callback,user_id,category_id){
    var values = {
        user_id: user_id,
		category_id: category_id
    };
    db.get().query('insert into user_likes SET ?',values,
        function (err, result) {
            if (err){
                return callback(err,null);
            }else {
                values['id'] = result.insertId;
                return callback(null,values);
            }
        })
};

exports.getUserLikes = function(callback,user_id){
	db.get().query('select * from user_likes, categories where user_likes.category_id = categories.id and user_id = ?',user_id,
	function(err,result){
		if (err){
			return callback(err,null)
		} else {
			var user_likes = [];
			for (var i =0; i < result.length; ++i){
				var user_like = {
					user_id: result[i].user_id,
					category_id: result[i].category_id,
					name: result[i].name
				};
				user_likes.push(user_like);
			}
			return callback(null,user_likes);
		}
	})
};

exports.deleteUserLike = function(callback,user_id,category_id){
    db.get().query('delete from user_likes where user_id  = ? and category_id = ?',[user_id,category_id],
        function (err, result) {
            if (err){
                return callback(err,null);
            }else {
                return callback(null,true);
            }
        })
};