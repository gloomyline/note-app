var express = require('express')
var router = express.Router()
var db = require('mongoose')
db.connect('mongodb://localhost/note_db')

// 备忘录内容
var Note = db.model('note', {
  folder: { type: db.Schema.ObjectId, ref: "NoteFolder" },
  content: { type: String, default: "" },
  create_time: { type: String, default: "" },
  update_time: { type: String, default: "" }
})

router.post('/',(req,res) => {
    var note = new Note(req.body)
    note.create_time = Date()
    note.save((err) => {
        if(err){
            res.json({status:'n',msg:'新增文件失败'})
        }else{
            var data = note.toObject()
            data.id = data._id
            delete data._id
            res.json({status:'y',msg:'新增文件成功',data:data})
        }
    })
})

router.put('/:id',(req,res) => {
    var update_data = req.body
    update_data.update_time = Date()
    var note = new Note(update_data)
    Note.findByIdAndUpdate(req.params.id,req.body,(err) => {
        if(err){
            res.json({status:'n',msg:'修改文件内容失败',data:{}})
        }else{
            var data = note.toObject()
            data.id = req.params.id
            delete data._id
            res.json({status:'y',msg:'修改文件内容成功',data:data})
        }
    })
})

router.get('/:id?',(req,res) => {
    var id = req.params.id
    if(id){
        // 根据文件id获取文件数据
        Note.findById(id,(err,data) => {
            if(err){
                res.json({status:'n',msg:'获取数据失败',data:{}})
            }else{
                // 判断查询数据是否为空
                if(!!data){
                    var temData = data.toObject()
                    temData.id = data._id
                    res.json({status:'y',msg:'获取数据成功',data:temData})
                }else{
                    res.json({status:'n',msg:'数据为空',data:{}})
                }
            }
        })
    }else{
        // 获取所有文件数据
        Note.find().exec((err,data) => {
            if(err){
                res.json({status:'n',msg:'获取数据失败',data:{}})
            }else{
                data = data.map(function(item){
                    item = item.toObject()
                    item.id = item._id
                    delete item._id
                    return item
                })
                res.json({status:'y',msg:'获取数据成功',data:data})
            }
        })
    }
})

router.delete('/:id',(req,res) => {
    var id = req.params.id
    if(id){
        Note.findByIdAndRemove(id,(err) => {
            if(err){
                res.json({status:'n',msg:'删除失败'})
            }else{
                res.json({status:'y',msg:'删除成功'})
            }
        })
    }else{
        res.json({status:'n',msg:'参数错误'})
    }
})


module.exports = router