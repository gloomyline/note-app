var express = require('express')
var router = express.Router()
var db = require('mongoose')

// 备忘录文件夹
var NoteFolder = db.model('noteFolder',{
  name:{type:String,default:"",required:true},
  create_time:{type:String,default:""},
  update_time:{type:String,default:""}
})

router.post('/',(req,res) => {
    var name = req.body.name
    if(!!name){
        var noteFolder = new NoteFolder(req.body)
        noteFolder.create_time = Date()
        noteFolder.save((err) => {
            if(err){
                console.log(err)
                res.json({status:'n',msg:'新增文件夹失败'})
            }else{
                var data = noteFolder.toObject()
                data.id = data._id
                delete data._id
                res.json({status:'y',msg:'新增文件夹成功',data:data})
            }
        })
    }else{
        res.json({status:'n',msg:'文件夹名称是必须的'})
    }   
})

// router.put('/:id',(req,res) => {
//     var noteFolder = new NoteFolder(req.body)
//     noteFolder.update_time = Date()
//     var data = noteFolder.toObject()
//     NoteFolder.findByIdAndUpdate(req.params.id,data,(err) => {
//         if(err){
//             res.json({status:'n',msg:'修改文件夹内容失败',data:{}})
//         }else{
//             data.id = req.params.id
//             delete data._id
//             res.json({status:'y',msg:'修改文件夹内容成功',data:data})
//         }
//     })
// })

router.get('/:id?',(req,res) => {
    var id = req.params.id
    console.log(id)
    if(id){
        // 根据文件夹id获取文件夹数据
        NoteFolder.findById(id,(err,data) => {
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
        // 获取所有文件夹数据
        NoteFolder.find().exec((err,data) => {
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
        NoteFolder.findByIdAndRemove(id,(err) => {
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