import { Router } from 'express'
import { authToken } from '../../../middleware/tokenVerify'
import FeaktionController from '../controller'
import EpisodeRouter from '../../episode/routers'

const router = Router()

/**
 * @swagger
 * paths:
 *   /feaktion:
 *     post:
 *       tags:
 *       - feaktion
 *       description: feaktion 생성
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 feaktion_title:
 *                   type: string
 *                 feaktion_description:
 *                   type: string
 *                 feaktion_type:
 *                   type: string
 *                 feaktion_pub:
 *                   type: string
 *                 feaktion_thumbnail:
 *                   type: string
 *                 genres:
 *                   type: array
 *                   items:
 *                     type: string
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
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
router.post('/', authToken, FeaktionController.postFeaktion)
/**
 * @swagger
 *   /feaktion:
 *     get:
 *       tags:
 *       - feaktion
 *       description: feaktion 리스트
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
router.get('/', authToken, FeaktionController.getFeaktionManyforMain)
/**
 * @swagger
 *   /feaktion/novels:
 *     get:
 *       tags:
 *       - feaktion
 *       description: novel feaktion 리스트
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
router.get('/novels', authToken, FeaktionController.getFeaktionManyforMoreNovels)
/**
 * @swagger
 *   /feaktion/shorts:
 *     get:
 *       tags:
 *       - feaktion
 *       description: short feaktion 리스트
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
router.get('/shorts', authToken, FeaktionController.getFeaktionManyforMoreShorts)
/**
 * @swagger
 *   /feaktion/myfeaktions:
 *     get:
 *       tags:
 *       - feaktion
 *       description: 내 feaktion 리스트
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
router.get('/myfeaktions', authToken, FeaktionController.getMyFeaktionMany)
/**
 * @swagger
 *   /feaktion/favorite:
 *     get:
 *       tags:
 *       - feaktion
 *       description: 즐겨찾기 feaktion 리스트
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
router.get('/favorite', authToken, FeaktionController.getFavorite)
/**
 * @swagger
 *   /feaktion/favorite:
 *     delete:
 *       tags:
 *       - feaktion
 *       description: feaktion 즐겨찾기 제거
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 favorite_id:
 *                   type: number
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
router.delete('/favorite', authToken, FeaktionController.deleteFavorite)
/**
 * @swagger
 *   /feaktion/{feaktion_id}:
 *     get:
 *       tags:
 *       - feaktion
 *       description: feaktion 조회
 *       parameters:
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
router.get('/:feaktion_id', authToken, FeaktionController.getFeaktion)
/**
 * @swagger
 *   /feaktion/{feaktion_id}:
 *     delete:
 *       tags:
 *       - feaktion
 *       description: feaktion 삭제
 *       parameters:
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
router.delete('/:feaktion_id', authToken, FeaktionController.isFeaktionWriter, FeaktionController.deleteFeaktion)
/**
 * @swagger
 *   /feaktion/{feaktion_id}:
 *     patch:
 *       tags:
 *       - feaktion
 *       description: feaktion 수정, 수정된 값만 포함해서 전송
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 feaktion_title:
 *                   type: string
 *                 feaktion_description:
 *                   type: string
 *                 feaktion_type:
 *                   type: string
 *                 feaktion_pub:
 *                   type: string
 *                 feaktion_thumbnail:
 *                   type: string
 *                 genres:
 *                   type: array
 *                   items:
 *                     type: string
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
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
router.patch('/:feaktion_id', authToken, FeaktionController.isFeaktionWriter, FeaktionController.updateFeaktion)
/**
 * @swagger
 *   /feaktion/{feaktion_id}/favorite:
 *     post:
 *       tags:
 *       - feaktion
 *       description: feaktion 즐겨찾기 추가
 *       parameters:
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
router.post('/:feaktion_id/favorite', authToken, FeaktionController.addFavorite)
router.use('/:feaktion_id/episode', EpisodeRouter)

export default router