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
 * paths:
 *   /feaktion/{feaktion_id}/episode:
 *     post:
 *       tags:
 *       - episode
 *       summary: Create a new episode
 *       description: Create a new episode
 *       parameters:
 *       - in: path
 *         name: feaktion_id
 *         required: true
 *         type: number
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 episode_title:
 *                   type: string
 *                 writer_comment:
 *                   type: string
 *                 scenes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                       scene:
 *                         type: string
 *                       image:
 *                         type: string
 *       responses:
 *         '200':
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ApiResponseSuccess'
 *         '400':
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ApiResponseFail'
 */
router.post('/', authToken, FeaktionController.isFeaktionWriter, EpisodeController.postEpisode)
/**
 * @swagger
 *   /feaktion/{feaktion_id}/episode/{episode_id}:
 *     get:
 *       tags:
 *       - episode
 *       summary: Get an episode
 *       description: Get an episode
 *       parameters:
 *       - in: path
 *         name: episode_id
 *         required: true
 *         type: number
 *       - in: path
 *         name: feaktion_id
 *         required: true
 *         type: number
 *       responses:
 *         '200':
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ApiResponseSuccess'
 *         '400':
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ApiResponseFail'
 */
router.get('/:episode_id', authToken, EpisodeController.getEpisode)
/**
 * @swagger
 *   /feaktion/{feaktion_id}/episode/{episode_id}:
 *     delete:
 *       tags:
 *       - episode
 *       summary: Delete an episode
 *       description: Delete an episode
 *       parameters:
 *       - in: path
 *         name: episode_id
 *         required: true
 *         type: number
 *       - in: path
 *         name: feaktion_id
 *         required: true
 *         type: number
 *       responses:
 *         '200':
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ApiResponseSuccess'
 *         '400':
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ApiResponseFail'
 */
router.delete('/:episode_id', authToken, FeaktionController.isFeaktionWriter, EpisodeController.deleteEpisode)
/**
 * @swagger
 *   /feaktion/{feaktion_id}/episode/{episode_id}:
 *     patch:
 *       tags:
 *       - episode
 *       summary: patch an episode
 *       description: patch an episode
 *       parameters:
 *       - in: path
 *         name: episode_id
 *         required: true
 *         type: number
 *       - in: path
 *         name: feaktion_id
 *         required: true
 *         type: number
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 episode_title:
 *                   type: string
 *                 writer_comment:
 *                   type: string
 *                 scenes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                       scene:
 *                         type: string
 *                       image:
 *                         type: string
 *       responses:
 *         '200':
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ApiResponseSuccess'
 *         '400':
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ApiResponseFail'
 */
router.patch('/:episode_id', FeaktionController.isFeaktionWriter, EpisodeController.updateEpisode)
/**
 * @swagger
 *   /feaktion/{feaktion_id}/episode/{episode_id}/like:
 *     post:
 *       tags:
 *       - episode
 *       summary: Like an episode
 *       description: Like an episode
 *       parameters:
 *       - in: path
 *         name: episode_id
 *         required: true
 *         type: number
 *       - in: path
 *         name: feaktion_id
 *         required: true
 *         type: number
 *       responses:
 *         '200':
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ApiResponseSuccess'
 *         '400':
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ApiResponseFail'
 */
router.post('/:episode_id/like', authToken, EpisodeController.addEpisodeLike)
/**
 * @swagger
 *   /feaktion/{feaktion_id}/episode/{episode_id}/like:
 *     delete:
 *       tags:
 *       - episode
 *       summary: unLike an episode
 *       description: unLike an episode
 *       parameters:
 *       - in: path
 *         name: episode_id
 *         required: true
 *         type: number
 *       - in: path
 *         name: feaktion_id
 *         required: true
 *         type: number
 *       responses:
 *         '200':
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ApiResponseSuccess'
 *         '400':
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ApiResponseFail'
 */
router.delete('/:episode_id/like', authToken, EpisodeController.removeEpisodeLike)
router.use('/:episode_id/comment', CommentRouter)


export default router