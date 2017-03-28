var db = require('../config/db')

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
	}
	db.get().query('insert into users SET ?',values,
	function (err, result) {
		if (err){
	    	return callback(err,null);
	  	}else {
			values['id'] = result.insertId;
			return callback(null,values);
		}
	})
}

exports.updateUser = function(callback,name,lastname,email,password,birth,sex,interested,id){
	var values = {
		name: name,
		lastname: lastname,
		email: email,
		password: password,
		birth: birth,
		sex: sex,
		interested: interested
	}
	db.get().query('update users SET ? where ?',[values,{id: id}],
	function (err, result) {
		if (err){
	    	return callback(err,null);
	  	}else {
			values['id'] = id;
			return callback(null,values);
		}
	})
}

exports.getUser = function(callback,id){
	db.get().query('select * from users where id = ?',id, function(err,result){
		if (err){
			return callback(err,null);
		} else {
			if (result[0]){
				var user = {
					id: result[0].id,
					name: result[0].name,
					lastname: result[0].lastname,
					email: result[0].email,
					birth: result[0].birth,
					sex: result[0].sex,
					interested: result[0].interested
				}
			} else {
				var user = null
			}
			return callback(null,user);
		}
	})
}