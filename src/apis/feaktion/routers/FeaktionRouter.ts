import { Router } from 'express'
import { authToken } from '../../../middleware/tokenVerify'
import FeaktionController from '../controller'

const router = Router()

router.post('/', authToken, FeaktionController.postFeaktion)
router.get('/:feaktion_id', authToken, FeaktionController.getFeaktion)
router.delete('/:feaktion_id', authToken, FeaktionController.isFeaktionWriter, FeaktionController.deleteFeaktion)
router.use('/:feaktion_id/episode', )

export default router