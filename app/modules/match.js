var db = require('../config/db')

function match(id,user_a_id,user_b_id){
	this.id = id;
	this.user_a_id = user_a_id;
    this.user_b_id = user_b_id;
}