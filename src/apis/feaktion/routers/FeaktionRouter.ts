import { Router } from 'express'
import { authToken } from '../../../middleware/tokenVerify'
import FeaktionController from '../controller'
import EpisodeRouter from '../../episode/routers'

const router = Router()

router.post('/', authToken, FeaktionController.postFeaktion)
router.get('/', authToken, FeaktionController.getFeaktionMany)
router.get('/myfeaktions', authToken, FeaktionController.getMyFeaktionMany)
router.get('/:feaktion_id', authToken, FeaktionController.getFeaktion)
router.delete('/:feaktion_id', authToken, FeaktionController.isFeaktionWriter, FeaktionController.deleteFeaktion)
router.patch('/:feaktion_id', authToken, FeaktionController.isFeaktionWriter, FeaktionController.updateFeaktion)
router.use('/:feaktion_id/episode', EpisodeRouter)

export default router