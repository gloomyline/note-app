var db = require('mongoose')
db.connect('mongodb://localhost/note_db')

// 备忘录文件夹
var NoteFolder = db.model('noteFolder', {
    name: { type: String, default: "", required: true },
    create_time: { type: String, default: "" },
    update_time: { type: String, default: "" }
})

// 备忘录内容
var Note = db.model('note', {
    folder: { type: db.Schema.ObjectId, ref: "NoteFolder" },
    content: { type: String, default: "" },
    create_time: { type: String, default: "" },
    update_time: { type: String, default: "" }
})

/**
 * 导出一个方法以便在多个位置使用
 * 功能是：将模型转换成普通数据对象
 * 并将 _id 变成 id
 *
 * @param {Model} model 数据模型
 * @returns {Object} 数据模型中的数据
 */
toObject = function(model) {
    model = model.toObject()
    model.id = model._id.toString()
    delete model._id
    delete model._v
    return model
}

/**
 * 将模型数组转换成普通数据对象的数组
 * 而且模型中的 _id 会被变成 id
 *
 * @param models 模型数组
 * @returns 普通数据数组
 */
toArray = function(models) {
    return models.map(m => toObject(m))
}

// 模块导出
module.exports = {
    NoteFolder:NoteFolder,
    Note:Note,
    toObject:toObject,
    toArray:toArray
}