var db = require('../config/db');

function user(id,name,lastname,email,password,birth,sex,interested){
	this.id = id;
	this.name = name;
    this.lastname = lastname;
	this.email = email;
	this.password = password;
	this.birth = birth;
	this.sex = sex;
	this.interested = interested;
}

exports.createUser = function(callback,name,lastname,email,password,birth,sex,interested){
	var values = {
		name: name,
		lastname: lastname,
		email: email,
		password: password,
		birth: birth,
		sex: sex,
		interested: interested
	};
	db.get().query('insert into users SET ?',values,
	function (err, result) {
		if (err){
	    	return callback(err,null);
	  	}else {
			values['id'] = result.insertId;
			return callback(null,values);
		}
	})
};

exports.updateUser = function(callback,name,lastname,email,password,birth,sex,interested,id){
	var values = {
		name: name,
		lastname: lastname,
		email: email,
		password: password,
		birth: birth,
		sex: sex,
		interested: interested
	};
	db.get().query('update users SET ? where ?',[values,{id: id}],
	function (err, result) {
		if (err){
	    	return callback(err,null);
	  	}else {
			values['id'] = id;
			return callback(null,values);
		}
	})
};

function create_user_hash(result){
    var user = null;
    if (result){
        user = {
            id: result.id,
            name: result.name,
            lastname: result.lastname,
            email: result.email,
            birth: result.birth,
            sex: result.sex,
            interested: result.interested
        }
    }
    return user;
}

exports.getUser = function(callback,id){
	db.get().query('select * from users where id = ? limit 1',id, function(err,result){
		if (err){
			return callback(err,null);
		} else {
			var user = create_user_hash(result[0]);
			return callback(null,user);
		}
	})
};

exports.getUserByEmail = function(callback,email){
	db.get().query('select * from users where email = ? limit 1',email, function(err,result){
		if (err){
			console.log('there was an error');
			console.log(err);
			return callback(err,null);
		} else {
            var user = create_user_hash(result[0]);
            if (user)
            	user.password = result[0].password;
			return callback(null,user)
		}
	})
};