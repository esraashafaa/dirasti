var express = require('express');
var router = express.Router();
var url=require('url');


var mysql=require('mysql');
var connection = mysql.createConnection({
        host: 'db4free.net',
        user: 'derasti',
        password: 'derasty123#',
        database: 'derasti'
});
connection.connect();
router.post('/login', function(req, res, next) {
    var queryData=url.parse(req.url,true).query;
    connection.query( "SELECT * FROM users WHERE mobile_id="+queryData['mobile_id']+" " ,function(error,results,fields){
        console.log(queryData);
        console.log(results);
        if (results!=null){
            connection.query(" UPDATE users SET gsm_token = '"+queryData['gsm_token']+"', gsm_token2 = '"+queryData['gsm_token2']+"' WHERE mobile_id="+queryData['mobile_id']+" ")
            console.log(results);
            console.log(error);
            res.json(results);
        } else  {
            res.json("notfound");
        }
    });
});
router.post('/loginid', function(req, res, next) {
    var queryData=url.parse(req.url,true).query;
    connection.query( "SELECT * FROM users WHERE id="+queryData['id']+" " ,function(error,results,fields){
        if (results!=null){
            console.log(results);
            res.json(results);
        } else  {
            res.json("notfound");
        }
    });//login
});
router.get('/check_login', function(req, res, next) {
    var queryData=url.parse(req.url,true).query;
    connection.query( "SELECT `mobile_id` FROM users WHERE mobile_id="+queryData['mobile_id']+" " ,function(error,results,fields){
        console.log(results);
        console.log(queryData['mobile_id']);
        if (results!=null && results.length !== 0){
            res.json(true);
        } else  {
            res.json(false);
        }
    });
});

router.post('/update_account', function(req, res, next) {
    var queryData=url.parse(req.url,true).query;
    connection.query(" UPDATE users SET email = '"+queryData['email']+"', mobile_id= '"+queryData['mobile_id']+"', password = '"+queryData['password']+"',grade= '"+queryData['grade']+"' WHERE id="+queryData['id']+" ",function(error,results,fields){
        if(!error){
            res.json(true);
        }else{
            res.json(false);
        }
    } );



});
router.post('/signin', function(req, res, next) {
    var queryData=url.parse(req.url,true).query;
    if(queryData['email']!=null && queryData['password']!=null&& queryData['grade']!=null){
            connection.query("INSERT INTO user ( `name`, `email`, `is_male`,`grade`,'mobile_id','password') VALUES ('"+queryData['name']+"','"+queryData['email']+"','"+queryData['is_male']+"','"+queryData['grade']+"', '"+queryData['mobile_id']+"', '"+queryData['password']+"',' ',' ')",function(error,results,fields){
            console.log(error)
            console.log(results)
            });

    }

});


//شو هية
//وين  راحت
module.exports = router;
