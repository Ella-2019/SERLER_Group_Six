import express from 'express'
import authCtrl from '../controllers/auth.controller'
import articleCtrl from '../controllers/search.controller'
import searchCtrl from '../controllers/search.controller'


const router = express.Router()

router.route('/api/search/new/:userId')
  .post(authCtrl.requireSignin, searchCtrl.create)

router.route('/api/search/by/:userId')
  .get(authCtrl.requireSignin, searchCtrl.listByUser)

router.route('/api/search/feed/:userId')
  .get(authCtrl.requireSignin, searchCtrl.listFeed)


router.route('/api/search/:searchId')
  .delete(authCtrl.requireSignin, searchCtrl.isPoster, searchCtrl.remove)

router.param('userId', userCtrl.userByID)
router.param('searchId', searchCtrl.searchByID)


//Soli add 2019/10/2
router.route('/api/searches/searchArticleList/')
  //.get(authCtrl.requireSignin, artiCtrl.listArticle)
  .get(articleCtrl.listArticle)

export default router