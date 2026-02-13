const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title :{
    type: String,
    required: true
  },
  description :{
    type: String,
    required: true
  },
  date:{
    type: Date,
    default: Date.now
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  like:{
    type : mongoose.Schema.Types.ObjectId, ref: 'user'
  }
})

module.exports = mongoose.model('post',postSchema)