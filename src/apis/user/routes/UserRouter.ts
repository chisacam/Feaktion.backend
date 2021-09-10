import { Router } from 'express'
import UserController from '../controller'
import { check, validationResult } from 'express-validator'
import { ValidationFailError } from '../../../lib/customErrorClass'
import { authToken } from '../../../middleware/tokenVerify'
const router = Router()

const sign_up_data_check = [
    check('id', 'id is required').not().isEmpty(),
    check('email', 'email is required').isEmail(),
    check('password', 'password len 6').isLength({ min: 8, max: 15 }),
    check('nickname', 'nickname is required').exists(), 
    check('sex', 'sex is required').not().isEmpty(),
    check('agree_info', 'agree_info is required').not().isEmpty(),
    check('agree_service', 'agree_service is required').not().isEmpty()
]

const sign_in_data_check = [
    check('email', 'email is required').not().isEmpty(),
    check('password', 'password is required').not().isEmpty(),
]

const exist_email_check = [
    check('email', 'not valid email').isEmail()
]

const error_callback = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) throw new ValidationFailError()
    next()
}
router.post('/signup', sign_up_data_check, error_callback, UserController.signup)
router.post('/signin', sign_in_data_check, error_callback, UserController.signin)
router.post('/idexistcheck', exist_email_check, UserController.isExistId)
router.delete('/', authToken, UserController.deleteUser)

export default router