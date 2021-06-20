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
  
  db.query('
    CREATE TABLE IF NOT EXISTS `users` (
    `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
    `login` varchar(30) NOT NULL,
    `password` varchar(50) NOT NULL,
    `birthday` Date NOT NULL,
    `info` varchar(150) NOT NULL,
    `phone` varchar(15) NOT NULL,
    PRIMARY KEY (`id`)
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8
   ', (e, _) => if (e) throw e)
})

/*

con.query(`INSERT INTO customers (name, address) VALUES (${}, ${})`, (e, _) => if (e) throw e)

*/



const app = express()
app.use(express.bodyParser())

app.get('/users/:id', (req, res) => {
  const id = req.params.id
  
  if(!id){
    db.query(`SELECT * FROM users`, (e, r,_) => {
      res.send(r)
    })
  }else{
    db.query(`SELECT * FROM users WHERE id=${id}`, (e, r,_) => {
      res.send(r)
    })
  }
})

app.post('/users', (req, res) => {
  const {name, login, password, birthday, info, phone} = req.body
  db.query(`INSERT INTO users (name, login, password, birthday, info, phone) VALUES (${name}, ${login}, ${password}, ${birthday}, ${info}, ${phone})`, (e, _) => if (e) throw e) 
})

app.put('/users/:id', (req, res) => {
  const id = req.params.id
  const {name, login, password, birthday, info, phone} = req.body
  db.query(`INSERT INTO users (name, login, password, birthday, info, phone) VALUES (${name}, ${login}, ${password}, ${birthday}, ${info}, ${phone}) WHERE id=${id}`, (e, _) => if (e) throw e)
 })

app.delete('/users/:id', (req, res) => {
  const id = req.params.id
  db.query(`DELETE FROM users WHERE id=${id}`, (e, _) => if (e) throw e)
})

app.listen(8000)
