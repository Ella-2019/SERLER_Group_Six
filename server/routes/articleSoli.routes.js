import express from 'express'
import articleSoliCtrl from '../controllers/articleSoli.controller'

const router = express.Router()


router.route('/api/articleSoli/findArticle/')
   .get(articleSoliCtrl.list)
  /* router.param('title', articleSoliCtrl.articleSoliTile)*/

   export default router
