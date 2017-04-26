//DATABASE CREDENTIALS



    exports.db_development = {
        host: 'localhost',
        user: 'root',
        password: '21290569',
        port: '3306',
        database: 'tinder'
    };




    exports.db_production = {
        host: 'us-cdbr-iron-east-03.cleardb.net',
        user: 'b8cfe09a39a44a',
        password: '382d8281',
        port: '3306',
        database: 'heroku_d6e921bc0e2580b'
    };




exports.facebook = {
    facebook_api_key: process.env.CLIENT_ID,
    facebook_api_secret: process.env.CLIENT_SECRET,
    callback_url: "http://localhost:3000/auth/facebook/callback"
};
