var mongoose = require('mongoose');

var todoListSchema = mongoose.Schema({
    hinhanh:{
        type: String,
        require: true,
    },
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    }
});
todoListSchema.index({ title: "text", description: "text" }); 

var TodolistModel = module.exports = mongoose.model('Todolist', todoListSchema);
module.exports.get = function(callback, limit){
    TodolistModel.find(callback).limit(limit);
}