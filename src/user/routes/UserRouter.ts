import { Router } from 'express';
import { UserController }  from '../controller'
import { check, validationResult } from 'express-validator';
const router = Router();

const data_check = [
    check("id", "id is required").not().isEmpty(),
    check("password", "password len 6").isLength({ min: 8, max: 15 }),
    check("nickname", "nickname is required").isEmpty(), 
    check("profile", "profile is required").not().isEmpty(),
    check("sex", "sex is required").not().isEmpty(),
    check("intro", "intro is required").not().isEmpty(),
    check('agree_info', "agree_info is required").not().isEmpty(),
    check('agree_service', "agree_service is required").not().isEmpty(),
    check('interest', "interest is required").not().isEmpty()
]

const error_callback = (req, res, next) => {
    const errors = validationResult(req)
    console.log(errors)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
    }
    next()
}
router.post('/signup', data_check, error_callback, UserController.signup)
router.post('/signin', UserController.signin)

export default router