import Article from '../models/article.model'
import _ from 'lodash'
import errorHandler from './../helpers/dbErrorHandler'
import formidable from 'formidable'
import fs from 'fs'

const create = (req, res, next) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Link could not be uploaded"
      })
    }
    let article = new Article(fields)
    article.postedBy= req.profile
    if(files.filelink){ //filelink is from article.model
      article.filelink.data = fs.readFileSync(files.filelink.path)
      article.filelink.contentType = files.filelink.type
    }
    article.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(result)
    })
  })
}

const articleByID = (req, res, next, id) => { //it was postByID
  Article.findById(id).populate('postedBy', '_id name').exec((err, article) => {
    if (err || !article)
      return res.status('400').json({
        error: "Article not found"
      })
    req.article = article
    next()
  })
}

const listByUser = (req, res) => {
  Article.find({postedBy: req.profile._id})
  .populate('comments', 'text created')
  .populate('comments.postedBy', '_id name')
  .populate('postedBy', '_id name')
  .sort('-created')
  .exec((err, p) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(article)
  })
}

const listFeed = (req, res) => {
  let following = req.profile.following
  following.push(req.profile._id)
  Article.find({postedBy: { $in : req.profile.following } })
  .populate('comments', 'text created')
  .populate('comments.postedBy', '_id name')
  .populate('postedBy', '_id name')
  .sort('-created')
  .exec((err, articles) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(articles)
  })
}

const remove = (req, res) => {
  let article = req.article
    article.remove((err, deletedArticle) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(deletedArticle)
    })
}

const filelink = (req, res, next) => {
    res.set("Content-Type", req.article.filelink.contentType)
    return res.send(req.article.filelink.data)
}

const like = (req, res) => {
  Article.findByIdAndUpdate(req.body.articleId, {$push: {likes: req.body.userId}}, {new: true})
  .exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(result)
  })
}

const unlike = (req, res) => {
  Article.findByIdAndUpdate(req.body.articleId, {$pull: {likes: req.body.userId}}, {new: true})
  .exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(result)
  })
}


const comment = (req, res) => {
  let comment = req.body.comment
  comment.postedBy = req.body.userId
  Article.findByIdAndUpdate(req.body.articleId, {$push: {comments: comment}}, {new: true})
  .populate('comments.postedBy', '_id name')
  .populate('postedBy', '_id name')
  .exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(result)
  })
}
const uncomment = (req, res) => {
  let comment = req.body.comment
  Article.findByIdAndUpdate(req.body.articleId, {$pull: {comments: {_id: comment._id}}}, {new: true})
  .populate('comments.postedBy', '_id name')
  .populate('postedBy', '_id name')
  .exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(result)
  })
}

const isPoster = (req, res, next) => {
  let isPoster = req.article && req.auth && req.article.postedBy._id == req.auth._id
  if(!isPoster){
    return res.status('403').json({
      error: "User is not authorized"
    })
  }
  next()
}

export default {
  listByUser,
  listFeed,
  create,
  articleByID: articleByID,
  remove,
  photo: filelink,
  like,
  unlike,
  comment,
  uncomment,
  isPoster
}
