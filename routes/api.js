var router = require('express').Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "",
    port: 3306,
    user: "",
    password: ""
});

router.post('/login', (req, res) => {
    var sql = `SELECT id from carshowroom.users where username='${req.body.username}' AND password='${req.body.password}'`;
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) {
            res.send({ 'msg': 'error' })
        }
        else {
            console.log(result)
            res.send({ 'data': result });
        }
    });
})

router.get('/getItems', (req, res) => {
    var sql = `select * from carshowroom.cars`;
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            res.send({ 'msg': 'sql error' })
        }
        else {
            // console.log(result);
            res.send({ 'data': result });
        }

    });
})

router.post('/add', (req, res) => {
    var sql = `INSERT INTO carshowroom.cars (title, description, url) VALUES ('${req.body.title}', '${req.body.desc}', '${req.body.url}')`;
    con.query(sql, function (err, result) {
        if (err) {
            res.send({ 'msg': 'error' })
        }
        else {
            console.log(result)
            // console.log("1 record inserted");
            res.send(result);
        }
    });
})

module.exports = router;