import { Router, Request, Response } from 'express'
import UserRouter from './user/routes'
import FeaktionRouter from './feaktion/routers'
import apiResponser from '../middleware/apiResponser'
const router = Router()

router.use('/users', UserRouter)
router.use('/feaktion', FeaktionRouter)
router.get('/error', (req, res, next) => {
    next(new Error('Wa!'))
})
router.get('/', async (req: Request, res: Response) => {
    apiResponser({
        req,
        res,
        message: 'Server is running'
    })
})
export default router
