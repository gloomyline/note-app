var express = require('express')
var router = express.Router()
var db = require('../db')

/**
 * 新增 post请求
 * @param  {[type]} '/:folder'    [description]
 * @param  {[type]} (req,res,next [description]
 * @return {[type]}               [description]
 */
router.post('/:folder', (req, res) => {
    var note = new db.Note(req.body)
    note.create_time = Date()
    note.folder = req.params.folder
    note.save((err) => {
        if (err) {
            res.json({ status: 'n', msg: '新增文件失败' })
        } else {
            res.json({ status: 'y', msg: '新增文件成功', data: db.toObject(note) })
        }
    })
})

/**
 * 修改 put请求
 * @param  {[type]} '/:folder/:id' [description]
 * @param  {[type]} (req,res,next  [description]
 * @return {[type]}                [description]
 */
router.put('/:folder/:id', (req, res) => {
    req.body.update_time = Date()
    db.Note.findByIdAndUpdate(req.params.id, req.body, (err) => {
        if (err) {
            res.json({ status: 'n', msg: '修改文件内容失败', data: {} })
        } else {
            res.json({ status: 'y', msg: '修改文件内容成功', data: {} })
        }
    })
})

/**
 * 获取指定文件目录中的数据
 * @param  {[type]} '/:folder/:id?' [description]
 * @param  {[type]} (req,           res,          next [description]
 * @return {[type]}                 [description]
 */
router.get('/:folder/:id?', (req, res) => {
    if (req.params.folder) {
        var id = req.params.id
        if (id) {
            // 根据文件id获取文件数据
            db.Note.findById(id, (err, data) => {
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
            // 获取所有文件数据
            db.Note.find({ folder: req.params.folder }).sort('-_id').exec((err, data) => {
                if (err) {
                    res.json({ status: 'n', msg: '获取数据失败', data: {} })
                } else {
                    res.json({ status: 'y', msg: '获取数据成功', data: db.toArray(data) })
                }
            })
        }
    } else {
        res.json({ status: 'n', msg: '获取数据失败，文件夹不存在', data: {} })
    }
})

/**
 * 删除 delete请求
 * @param  {[type]} '/:folder/:id' [description]
 * @param  {[type]} (req,res,next  [description]
 * @return {[type]}                [description]
 */
router.delete('/:folder/:id', (req, res) => {
    var id = req.params.id
    if (id) {
        db.Note.findByIdAndRemove(id, (err) => {
            if (err) {
                res.json({ status: 'n', msg: '删除失败', data: {} })
            } else {
                res.json({ status: 'y', msg: '删除成功', data: {} })
            }
        })
    } else {
        res.json({ status: 'n', msg: '参数错误', data: {} })
    }
})


module.exports = router