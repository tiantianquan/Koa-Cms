var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId

var CategorySchema = new Schema({
  name:{
    type:String
  }
})

module.exports = mongoose.model('Category',CategorySchema)
