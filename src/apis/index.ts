import { Router, Request, Response } from 'express'
import UserRouter from './user/routers'
import FeaktionRouter from './feaktion/routers'
import apiResponser from '../middleware/apiResponser'
const router = Router()

router.use('/user', UserRouter)
router.use('/feaktion', FeaktionRouter)
router.get('/', async (req: Request, res: Response) => {
    apiResponser({
        req,
        res,
        result: true,
        message: 'Server is running'
    })
})
export default router
