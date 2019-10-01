
import ArticleSoli from '../models/articleSoli.model'
import _ from 'lodash'



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
  const list = (res) => {
    ArticleSoli.find((err, articleSoli) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(articleSoli)
    }).select('title author body addedon')
  }

export default {
 /* articleSoliTile,*/
  list
 // findArticle
}
