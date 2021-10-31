import { NextFunction, Request, Response, Router } from 'express'
import UserController from '../controller'
import { check, ValidationChain, validationResult } from 'express-validator'
import { ValidationFailError } from '../../../lib/customErrorClass'
import { authToken } from '../../../middleware/tokenVerify'
const router = Router()

const sign_up_data_check: ValidationChain[] = [
    check('id', 'id is required').not().isEmpty(),
    check('email', 'email is required').isEmail().not().isEmpty(),
    check('password', 'password len 6').isLength({ min: 8, max: 15 }),
    check('nickname', 'nickname is required').exists(), 
    check('sex', 'sex is required').not().isEmpty(),
    check('agree_info', 'agree_info is required').not().isEmpty(),
    check('agree_service', 'agree_service is required').not().isEmpty()
]

const sign_in_data_check: ValidationChain[] = [
    check('email', 'email is required').not().isEmpty(),
    check('password', 'password is required').not().isEmpty(),
]

const exist_email_check: ValidationChain[] = [
    check('email', 'not valid email').isEmail().not().isEmpty()
]

const error_callback = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) throw new ValidationFailError()
    next()
}

/**
 * @swagger
 * paths:
 *   /signup:
 *     post:
 *       tags:
 *       - user
 *       description: 유저 가입
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 id:
 *                   type: string
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *                 nickname:
 *                   type: string
 *                 sex:
 *                   type: string
 *                 agree_info:
 *                   type: boolean
 *                 agree_service:
 *                   type: boolean
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
router.post('/signup', sign_up_data_check, error_callback, UserController.signup)
/**
 * @swagger
 *   /signin:
 *     post:
 *       tags:
 *       - user
 *       description: 유저 로그인
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *       responses:
 *         '200':
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ApiResponseLogin'
 *         '404':
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ApiResponseFail'
 *         '500':
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ApiResponseFail'
 */
router.post('/signin', sign_in_data_check, error_callback, UserController.signin)
/**
 * @swagger
 *   /idexistcheck:
 *     post:
 *       tags:
 *       - user
 *       description: 중복 이메일 체크
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 email:
 *                   type: string
 *       responses:
 *         '200':
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ApiResponseSuccess'
 *         '500':
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ApiResponseFail'
 */
router.post('/idexistcheck', exist_email_check, error_callback, UserController.isExistEmail)
/**
 * @swagger
 *   /:
 *     delete:
 *       tags:
 *       - user
 *       description: 회원 탈퇴
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 password:
 *                   type: string
 *       responses:
 *         '200':
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ApiResponseSuccess'
 *         '500':
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ApiResponseFail'
 */
router.delete('/', authToken, UserController.deleteUser)
/**
 * @swagger
 *   /:
 *     get:
 *       tags:
 *       - user
 *       description: 회원 정보 요청
 *       responses:
 *         '200':
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ApiResponseSuccess'
 *         '404':
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ApiResponseFail'
 */
router.get('/', authToken, UserController.getUserInfo)
/**
 * @swagger
 *   /interest:
 *     post:
 *       tags:
 *       - user
 *       description: 관심 장르 추가
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 genres:
 *                   type: array
 *                   items:
 *                     type: string
 *       responses:
 *         '200':
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ApiResponseSuccess'
 *         '500':
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ApiResponseFail'
 */
router.post('/interest', authToken, UserController.addInterestGenre)
/**
 * @swagger
 *   /interest:
 *     patch:
 *       tags:
 *       - user
 *       description: 관심 장르 수정
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 genres:
 *                   type: array
 *                   items:
 *                     type: string
 *                 removed_genres:
 *                   type: array
 *                   items:
 *                     type: integer
 *       responses:
 *         '200':
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ApiResponseSuccess'
 *         '500':
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ApiResponseFail'
 */
router.patch('/interest', authToken, UserController.patchInterestGenre)

export default router