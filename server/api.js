const db = require('./db')
const express = require('express')
const router = express.Router()

//获取所有文章
router.post('/api/getArticleList', (req, res) => {
  const limit = req.body.limit
  let page = req.body.page
  let allNum
  let allPage
  let skip = 0
  if (page !== 0) {
    skip = limit * (page - 1)
  }
  db.Article.find(null, function (err, doc) {
    allNum = doc.length
    db.Article.find()
      .limit(limit)
      .skip(skip)
      .sort('-date')
      .exec(function(err, doc) {
        allPage = Math.ceil(allNum / limit)
        if (err) {
          console.log(err)
        } else if (doc) {
          res.send({ doc: doc, allPage: allPage })
        }
      })
  })
})

//文章详情
router.get('/api/getArticle', (req, res) => {
  const id = req.query.id
  db.Article.findByIdAndUpdate(id, { $inc: { read: 1 } }, (err, doc) => {
    if (err) {
      console.log(err)
    } else if (doc) {
      res.send(doc)
    }
  })
})

module.exports = router
