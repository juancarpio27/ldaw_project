var db = require('../config/db');

function category(id, name) {
    this.id = id;
    this.name = name;
}

function create_category_hash(result) {
    var category = null;
    if (result) {
        category = {
            id: result.id,
            name: result.name
        }
    }
    return category;
}

exports.getCategory = function (callback, id) {
    db.get().query('select * from categories where id = ? limit 1', id, function (err, result) {
        if (err) {
            return callback(err, null);
        } else {
            var category = create_category_hash(result[0]);
            return callback(null, category);
        }
    })
};

exports.indexCategories = function (callback) {
    db.get().query('select * from categories', function (err, result) {
        if (err) {
            return callback(err, null);
        } else {
            var categories = [];
            for (var i = 0; i < result.length; ++i) {
                var category = create_category_hash(result[i]);
                categories.push(category);
            }
            return callback(null, categories);
        }
    })
};

exports.createCategory = function (callback, name) {
    var values = {
        name: name
    };
    db.get().query('insert into categories SET ?', values,
        function (err, result) {
            if (err) {
                return callback(err, null);
            } else {
                values['id'] = result.insertId;
                return callback(null, values);
            }
        })
};

exports.updateCategory = function (callback,id, name) {
    db.get().query('update categories set name = ? where id = ?', [name, id],
        function (err, result) {
            if (err) {
                return callback(err, null);
            } else {
                var values = {
                    name: name,
                    id: id
                };
                return callback(null, values);
            }
        })
};

exports.deleteCategory = function (callback, id) {
    db.get().query('delete from categories where id = ?', id, function (err, result) {
        if (err) {
            return callback(err, null);
        } else {
            return callback(null, true);
        }
    })
};