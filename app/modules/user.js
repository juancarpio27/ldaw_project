var db = require('../config/db');
var category_user = require('./category_user');

function user(id, name, lastname, email, password, birth, sex, interested) {
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.birth = birth;
    this.sex = sex;
    this.interested = interested;
}

exports.createUser = function (callback, name, lastname, email, password, birth, sex, interested) {
    var values = {
        name: name,
        lastname: lastname,
        email: email,
        password: password,
        birth: birth,
        sex: sex,
        interested: interested
    };
    db.get().query('insert into users SET ?', values,
        function (err, result) {
            if (err) {
                return callback(err, null);
            } else {
                values['id'] = result.insertId;
                return callback(null, values);
            }
        })
};

exports.updateUser = function (callback, name, lastname, email, password, birth, sex, interested, id) {
    var values = {
        name: name,
        lastname: lastname,
        email: email,
        password: password,
        birth: birth,
        sex: sex,
        interested: interested
    };
    console.log('Im the query, my values are',values);
    db.get().query('update users SET ? where ?', [values, {id: id}],
        function (err, result) {
            if (err) {
                return callback(err, null);
            } else {
                values['id'] = id;
                return callback(null, values);
            }
        })
};

function create_user_hash(result) {
    var user = null;
    if (result) {
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

exports.getUser = function (callback, id) {
    db.get().query('select * from users where id = ? limit 1', id, function (err, result) {
        if (err) {
            return callback(err, null);
        } else {
            var user = create_user_hash(result[0]);
            return callback(null, user);
        }
    })
};

exports.destroyUser = function (callback, id) {
    db.get().query('delete from users where id = ?', id, function (err, result) {
        if (err) {
            return callback(err, null);
        } else {
            return callback(null, true);
        }
    })
};

exports.getUserByEmail = function (callback, email) {
    db.get().query('select * from users where email = ? limit 1', email, function (err, result) {
        if (err) {
            console.log('there was an error');
            console.log(err);
            return callback(err, null);
        } else {
            var user = create_user_hash(result[0]);
            if (user)
                user.password = result[0].password;
            return callback(null, user)
        }
    })
};

exports.getUsersInterested = function (callback, id, bloomfilter) {
    db.get().query('select * from users where id = ? limit 1', id, function (err, result) {
        if (err) {
            return callback(err, null);
        } else {
            var user = create_user_hash(result[0]);
            db.get().query('select * from users as u where sex = ? and not exists (select * from user_seen where user_id = ? and user_seen_id = u.id) limit 25',
                [result[0].interested, id], function (err, result) {
                    if (err) {
                        return callback(err, null);
                    } else {
                        var interested = [];
                        for (var i = 0; i < result.length; ++i) {
                            var user = create_user_hash(result[i]);
                            interested.push(user);
                        }
                        return callback(null, interested);
                    }
                })

        }
    })
};
