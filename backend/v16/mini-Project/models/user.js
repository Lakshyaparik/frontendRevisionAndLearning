const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/mini-Project')

const userSchema = mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  posts:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post'
  }
})

module.exports = mongoose.model('user',userSchema)