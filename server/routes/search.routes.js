import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'
import articleCtrl from '../controllers/article.controller'
import searchCtrl from '../controllers/search.controller'


const router = express.Router()

/*router.route('/api/search/feed/:userId')
  .get(authCtrl.requireSignin, searchCtrl.listFeed)*/


//Soli add 2019/10/2
router.route('/api/searches/searchArticleList/')
  //.get(authCtrl.requireSignin, artiCtrl.listArticle)
  .get(searchCtrl.listArticle)

/*router.param('userId', userCtrl.userByID)
router.param('articleId', artiCtrl.articleByID)*/

export default router