import { Router } from 'express'
import { authToken } from '../../../middleware/tokenVerify'
import CommentController from '../controller'

const router = Router({
    mergeParams: true
})

/**
 * @swagger
 * paths:
 *   /feaktion/{feaktion_id}/episode/{episode_id}/comment:
 *     get:
 *       tags:
 *       - comment
 *       summary: Get all comments of an episode
 *       description: Get all comments of an episode
 *       parameters:
 *       - in: path
 *         name: feaktion_id
 *         required: true
 *         type: number
 *       - in: path
 *         name: episode_id
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
router.get('/', authToken, CommentController.getCommentMany)
/**
 * @swagger
 *   /feaktion/{feaktion_id}/episode/{episode_id}/comment:
 *     post:
 *       tags:
 *       - comment
 *       summary: Create comment of an episode
 *       description: Create comment of an episode
 *       parameters:
 *       - in: path
 *         name: feaktion_id
 *         required: true
 *         type: number
 *       - in: path
 *         name: episode_id
 *         required: true
 *         type: number
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 comment_body:
 *                   type: string
 *                   example: "This is a comment"
 *       responses:
 *         '200':
 *           content:
 *             description: Success
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ApiResponseSuccess'
 *         '400':
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ApiResponseFail'
 */
router.post('/', authToken, CommentController.postComment)
/**
 * @swagger
 *   /feaktion/{feaktion_id}/episode/{episode_id}/comment/{comment_id}:
 *     patch:
 *       tags:
 *       - comment
 *       summary: edit comment of an episode
 *       description: edit comment of an episode
 *       parameters:
 *       - in: path
 *         name: feaktion_id
 *         required: true
 *         type: number
 *       - in: path
 *         name: episode_id
 *         required: true
 *         type: number
 *       - in: path
 *         name: comment_id
 *         required: true
 *         type: number
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 comment_body:
 *                   type: string
 *                   example: "This is a edited comment"
 *       responses:
 *         '200':
 *           content:
 *             description: Success
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ApiResponseSuccess'
 *         '400':
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ApiResponseFail'
 */
router.patch('/:comment_id', authToken, CommentController.updateComment)
/**
 * @swagger
 *   /feaktion/{feaktion_id}/episode/{episode_id}/comment/{comment_id}:
 *     delete:
 *       tags:
 *       - comment
 *       summary: delete comment of an episode
 *       description: delete comment of an episode
 *       parameters:
 *       - in: path
 *         name: feaktion_id
 *         required: true
 *         type: number
 *       - in: path
 *         name: episode_id
 *         required: true
 *         type: number
 *       - in: path
 *         name: comment_id
 *         required: true
 *         type: number
 *       responses:
 *         '200':
 *           content:
 *             description: Success
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ApiResponseSuccess'
 *         '400':
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ApiResponseFail'
 */
router.delete('/:comment_id', authToken, CommentController.isCommentWriter, CommentController.deleteComment)

export default router