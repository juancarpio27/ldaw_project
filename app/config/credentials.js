//DATABASE CREDENTIALS
exports.db = {
    connectionLimit : 1000,
    connectTimeout  : 60 * 60 * 1000,
    aquireTimeout   : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000,
    host: 'mysql-instance1.chzyccekiuas.us-west-2.rds.amazonaws.com',
    user: 'juancarpio',
    password: '12345678',
    port: '3306',
    database: 'tinder'
};

exports.facebook = {
    facebook_api_key: process.env.CLIENT_ID,
    facebook_api_secret: process.env.CLIENT_SECRET,
    callback_url: "http://localhost:3000/auth/facebook/callback"
};