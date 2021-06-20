//импорт библиотек
const express = require('express')
const mysql = require('mysql')

//подключение к базе данных
const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'db'
})

db.connect(function (e){
  //проверка на ошибки
  if(e) throw e
  
  //создание таблицы если таковой нет
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

//инциализация API
const app = express()
//подключение парсера для входных данных
app.use(express.bodyParser())
//настройка GET запроса (READ)
app.get('/users/:id', (req, res) => {
  //переменная id из параметра запроса
  const id = req.params.id
  //в случае отсутствия id возвращает все записи
  if(!id){
    db.query(`SELECT * FROM users`, (e, r,_) => {
      res.send(r)
    })
  }else{
    //возвращает запись с определенным id
    db.query(`SELECT * FROM users WHERE id=${id}`, (e, r,_) => {
      res.send(r)
    })
  }
})
//настройка POST запроса (CREATE)
app.post('/users', (req, res) => {
  //деструкризация тела запроса
  const {name, login, password, birthday, info, phone} = req.body
  db.query(`INSERT INTO users (name, login, password, birthday, info, phone) VALUES (${name}, ${login}, ${password}, ${birthday}, ${info}, ${phone})`, (e, _) => if (e) throw e) 
})
//настройка PUT запроса (UPDATE)
app.put('/users/:id', (req, res) => {
  const id = req.params.id
  {
  //деструкризация тела запроса
  const {name, login, password, birthday, info, phone} = req.body
  db.query(`INSERT INTO users (name, login, password, birthday, info, phone) VALUES (${name}, ${login}, ${password}, ${birthday}, ${info}, ${phone}) WHERE id=${id}`, (e, _) => if (e) throw e)
 })
//настройка DELETE запроса (DELETE)
app.delete('/users/:id', (req, res) => {
  const id = req.params.id
  db.query(`DELETE FROM users WHERE id=${id}`, (e, _) => if (e) throw e)
})
//запускает сервер на порту 8000
app.listen(8000)
