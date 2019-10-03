import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'
import artiCtrl from '../controllers/article.controller'

const router = express.Router()

router.route('/api/articles/new/:userId')
  .post(authCtrl.requireSignin, artiCtrl.create)

router.route('/api/articles/filelink/:articleId')
  .get(artiCtrl.photo)

router.route('/api/articles/by/:userId')
  .get(authCtrl.requireSignin, artiCtrl.listByUser)

router.route('/api/articles/feed/:userId')
  .get(authCtrl.requireSignin, artiCtrl.listFeed)

router.route('/api/articles/like')
  .put(authCtrl.requireSignin, artiCtrl.like)
router.route('/api/articles/unlike')
  .put(authCtrl.requireSignin, artiCtrl.unlike)

router.route('/api/articles/comment')
  .put(authCtrl.requireSignin, artiCtrl.comment)
router.route('/api/articles/uncomment')
  .put(authCtrl.requireSignin, artiCtrl.uncomment)

router.route('/api/articles/:articleId')
  .delete(authCtrl.requireSignin, artiCtrl.isPoster, artiCtrl.remove)

router.param('userId', userCtrl.userByID)
router.param('articleId', artiCtrl.articleByID)

export default router
