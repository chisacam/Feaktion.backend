import { Router } from 'express'
import { authToken } from '../../../middleware/tokenVerify'
import EpisodeController from '../controller'
import FeaktionController from '../../feaktion/controller'

const router = Router({
    mergeParams: true
})

router.get('/:episode_id', authToken, EpisodeController.getEpisode)
router.post('/', authToken, EpisodeController.postEpisode)
router.delete('/:episode_id', authToken, FeaktionController.isFeaktionWriter, EpisodeController.deleteEpisode)

export default router