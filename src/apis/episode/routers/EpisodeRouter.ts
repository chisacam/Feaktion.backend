import { Router } from 'express'
import { authToken } from '../../../middleware/tokenVerify'
import EpisodeController from '../controller'
import FeaktionController from '../../feaktion/controller'
import CommentRouter from '../../comment/routers'

const router = Router({
    mergeParams: true
})

/**
 * @swagger
 *   /feaktion/{feaktionId}/episode:
 *     post:
 *       tags:
 *       - episode
 *       summary: Create a new episode
 *       description: Create a new episode
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 
 *             
 */
router.post('/', authToken, EpisodeController.postEpisode)
router.get('/:episode_id', authToken, EpisodeController.getEpisode)
router.delete('/:episode_id', authToken, FeaktionController.isFeaktionWriter, EpisodeController.deleteEpisode)
router.patch('/:episode_id', FeaktionController.isFeaktionWriter, EpisodeController.updateEpisode)
router.post('/:episode_id/like', authToken, EpisodeController.addEpisodeLike)
router.delete('/:episode_id/like', authToken, EpisodeController.removeEpisodeLike)
router.use('/:episode_id/comment', CommentRouter)


export default router