// Created by Soli 2019/10/2
import Article from '../models/article.model'
import Search from '../models/search.model'
import _ from 'lodash'
import errorHandler from './../helpers/dbErrorHandler'




import formidable from 'formidable'
import fs from 'fs'

/* const findArticle = (req, res) => {
  ArticleSoli.findOne({
    "title": req.body.title
    })
  
  const list = (req, res) => {
    ArticleSoli.find((err, articleSoli) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(articleSoli)
    }).select('title author body addedon')
  }*/
  /*const list = (res) => {
    ArticleSoli.find((err, articleSoli) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(articleSoli)
    }).select('title author body addedOn')
  }
*/
//export default {
 /* articleSoliTile,*/
//  list
 // findArticle
//}

/*const listArticle = (req, res) => {
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
}*/
/*const listArticle = (req, res, next, id) => { //it was postByID
  Article.findOne.find().exec((err, article) => {
    if (err )
      return res.status('400').json({
        error: "Article not found"
      })
    req.article = article
    next()
  })
}*/
/*const listArticle = (req, res, next, id) => { 
  Article.findById(id).populate('postedBy', '_id name').exec((err, article) => {
    if (err || !article)
      return res.status('400').json({
        error: "Article not found"
      })
    req.article = article
    next()
  })
}*/
/*const listArticle = (req,res) => {
  Article.find((err, articles) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(articles)
  })
}*/
const listArticle = (req, res) => {
  
  Article.find().exec((err, articles) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(articles)
  })
}
const listFeed = (req, res) => {
  find()
  exec((err, searches) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(searches)
  })
}


export default {
  listArticle,
  listFeed
}

