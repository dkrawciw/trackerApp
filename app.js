const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      mysql = require('mysql');

const connection = mysql.createConnection({
  host    : '127.0.0.1',
  user    : 'root',
  password: 'xD#X3227l!7K&LW4k4av',
  database: 'interrobang_db',
  port    : '3306'
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.listen(80, function(){
  console.log('Tracker App Running');
})

app.get('/', function(req, res){
  connection.query('SELECT id, time_checked, DATEDIFF(NOW(), time_checked) AS time_passed FROM checked_times', function(err, results, fields){
    if(err) throw err;
    res.render('index.ejs', {results: results});
  });
});
app.post('/deleteTime/:time', function(req, res){
  connection.query('DELETE FROM checked_times WHERE id = ' + req.params.time + ';' );
  res.redirect('/');
});
