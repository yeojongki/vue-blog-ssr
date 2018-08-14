const mongoose = require('mongoose')
// 连接数据库 如果不自己创建 默认test数据库会自动生成
mongoose.connect('mongodb://localhost/test');

// 为这次连接绑定事件
const db = mongoose.connection
db.once('error', () => console.log('Mongo connection error'))
db.once('open', () => console.log('Mongo connection successed'))

/************** 定义模式userSchema **************/
const userSchema = mongoose.Schema({
  name: String,
  password: String,
  password_Re: String
})
const articleSchema = mongoose.Schema({
  date: Date,
  updated: Date,
  title: String,
  content: String,
  description: String,
  state: Number,
  read: Number,
  tags: [{}]
})
const tagSchema = mongoose.Schema({
  id:Number,
  name: String
})
/************** 定义模型Model **************/
const Models = {
  User: mongoose.model('User', userSchema),
  Article: mongoose.model('Article', articleSchema),
  Tag: mongoose.model('Tag', tagSchema)
}

module.exports = Models
