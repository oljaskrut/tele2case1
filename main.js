const express = require('express')
const mysql = require('mysql')


const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'db'
})

db.connect(function (e){
  if(e) throw e
  
  con.query('
    CREATE TABLE IF NOT EXISTS `user` (
    `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
    `login` varchar(30) NOT NULL,
    `password` varchar(50) NOT NULL,
    `birthday` Date NOT NULL,
    `info` varchar(150) NOT NULL,
    `phone` varchar(15) NOT NULL,
    PRIMARY KEY (`id`)
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8
   ', (e, _) => if (e) throw e)
  
  con.query(`INSERT INTO customers (name, address) VALUES (${}, ${})`, (e, _) => if (e) throw e)
})



const app = express()

app.get('/', (req, res) => {
  res.send("Hello World")
})

app.listen(8000)
