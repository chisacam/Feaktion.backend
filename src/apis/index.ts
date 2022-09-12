import { Router, Request, Response, NextFunction } from 'express'
import UserRouter from './user/routers'
import FeaktionRouter from './feaktion/routers'
import SearchRouter from './search/routers'
import apiResponser from '../middleware/apiResponser'
import { authToken } from '../middleware/tokenVerify'
import { putUrlGenerate, getUrlGenerate } from '../middleware/imageUrlGenerater'

const router = Router()

router.use('/user', UserRouter)
router.use('/feaktion', FeaktionRouter)
router.use('/search', SearchRouter)
/**
 * @swagger
 * paths:
 *   /putImage:
 *     get:
 *       tags:
 *       - geturl
 *       description: put image url
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
router.get('/putImage', authToken, putUrlGenerate)
/**
 * @swagger
 * paths:
 *   /getImage:
 *     get:
 *       tags:
 *       - geturl
 *       description: get image url
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
router.get('/getImage', authToken, getUrlGenerate)
router.get('/', async (req: Request, res: Response) => {
    apiResponser({
        req,
        res,
        result: true,
        message: 'Server is running'
    })
})
export default router
