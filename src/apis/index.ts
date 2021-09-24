import { Router, Request, Response } from 'express'
import UserRouter from './user/routes'
import FeaktionRouter from './feaktion/routers'
const router = Router()

router.use('/user', UserRouter)
router.use('/feaktion', FeaktionRouter)
router.get('/', async(req: Request, res: Response)=> {
    res.send('app get is running')
})
export default router