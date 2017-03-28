var db = require('../config/db');

function category_user(id,user_id,category_id){
	this.id = id;
	this.user_id = user_id;
    this.category_id = category_id;
}

exports.createCategoryUser = function(callback,user_id,category_id){
    var values = {
        user_id: user_id,
        category_id: category_id
    };
    db.get().query('insert into category_users SET ?',values,
        function (err, result) {
            if (err){
                return callback(err,null);
            }else {
                values['id'] = result.insertId;
                return callback(null,values);
            }
        })
};

exports.getCategoryUsers = function(callback,user_id){
    db.get().query('select * from category_users, categories where category_users.category_id = categories.id and user_id = ?',user_id,
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

exports.deleteCategoryUser = function(callback,user_id,category_id){
    db.get().query('delete from category_users where user_id  = ? and category_id = ?',[user_id,category_id],
        function (err, result) {
            if (err){
                return callback(err,null);
            }else {
                return callback(null,true);
            }
        })
};