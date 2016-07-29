var express = require('express')
var router = express.Router()
var db = require('../db')

router.post('/', (req, res) => {
    var name = req.body.name
    if (!!name) {
        var noteFolder = new db.NoteFolder(req.body)
        noteFolder.create_time = Date()
        noteFolder.save((err) => {
            if (err) {
                console.log(err)
                res.json({ status: 'n', msg: '新增文件夹失败' })
            } else {
                // console.log(db.toObject(noteFolder))
                res.json({ status: 'y', msg: '新增文件夹成功', data: db.toObject(noteFolder) })
            }
        })
    } else {
        res.json({ status: 'n', msg: '文件夹名称是必须的' })
    }
})

// router.put('/:id',(req,res) => {
//     var noteFolder = new db.NoteFolder(req.body)
//     noteFolder.update_time = Date()
//     var data = noteFolder.toObject()
//     db.NoteFolder.findByIdAndUpdate(req.params.id,data,(err) => {
//         if(err){
//             res.json({status:'n',msg:'修改文件夹内容失败',data:{}})
//         }else{
//             data.id = req.params.id
//             delete data._id
//             res.json({status:'y',msg:'修改文件夹内容成功',data:data})
//         }
//     })
// })

router.get('/:id?', (req, res) => {
    var id = req.params.id
    if (id) {
        // 根据文件夹id获取文件夹数据
        db.NoteFolder.findById(id, (err, data) => {
            if (err) {
                res.json({ status: 'n', msg: '获取数据失败', data: {} })
            } else {
                // 判断查询数据是否为空
                if (!!data) {
                    res.json({ status: 'y', msg: '获取数据成功', data: db.toObject(data) })
                } else {
                    res.json({ status: 'n', msg: '数据为空', data: {} })
                }
            }
        })
    } else {
        // 获取所有文件夹数据
        db.NoteFolder.find().sort('-_id').exec((err, data) => {
            if (err) {
                res.json({ status: 'n', msg: '获取数据失败', data: {} })
            } else {
                db.Note.aggregate({
                    $group: {
                        _id: '$folder',
                        count: {
                            $sum: 1
                        }
                    }
                }).exec((err, gdata) => {
                    if (err) {
                        console.log(err)
                        res.json({ status: 'n', msg: '获取数据失败', data: {} })
                    } else {
                        var resData = db.toArray(data)
                        resData = resData.map(function(item) {
                            var count = 0
                            for (var i=0; i < gdata.length; i++) {
                                if (item.id == gdata[i]._id) {
                                    count = gdata[i].count
                                }
                            }
                            item.count = count
                            return item
                        })
                        res.json({ status: 'y', msg: '获取数据成功', data: resData })
                    }
                })
            }
        })
    }
})

router.delete('/:id', (req, res) => {
    var id = req.params.id
    if (id) {
        db.NoteFolder.findByIdAndRemove(id, (err) => {
            if (err) {
                res.json({ status: 'n', msg: '删除失败' })
            } else {
                res.json({ status: 'y', msg: '删除成功' })
            }
        })
    } else {
        res.json({ status: 'n', msg: '参数错误' })
    }
})

module.exports = router