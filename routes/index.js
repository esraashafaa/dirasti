const express = require('express');
const router = express.Router();
const url = require('url');


const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'db4free.net',
  user: 'derasti',
  password: 'derasty123#',
  database: 'derasti'
});
connection.connect();

router.get('/', function(req, res, next) {
  const queryData = url.parse(req.url, true).query;
  connection.query("SELECT grade FROM  user WHERE id="+queryData['id']+"" ,function(error,results) {
      console.log(results);
      res.json(results);
  var json_data = JSON.parse(JSON.stringify(results));
      connection.query('SELECT * FROM subject WHERE grade="'+ json_data['grade']+'"', function (error, result) {
          console.log(result);
          res.json(result);
      });
  })
  });




module.exports = router;
