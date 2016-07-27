var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/notes', initNoteApp, (req, res, next) => {
    console.log('进入备忘录！')
})

app.use('/note', require('./routes/note'))

app.use('/noteFolder', require('./routes/noteFolder'))

app.listen(3000, (req, res) => {
    console.log('Server is running!')
})

//初始化项目根目录下notes文件目录
function initNoteApp(req, res, next) {
    fs.exists('./notes', function(exi) {
        if (exi) {
            // console.log('目录已存在');
            res.json({ status: 'n', msg: '目录已存在' })
            next();
        } else {
            // 在项目根目录中创建一个notes目录
            fs.mkdirSync('./notes');
            // console.log('初始化目录完成!');
            res.json({ status: 'y', msg: '初始化目录完成！' })
            next();
        }
    });
}