var db = require('../config/db')

function user_like(id,user_id,category_id){
	this.id = id;
	this.user_id = user_id;
    this.category_id = category_id;
}