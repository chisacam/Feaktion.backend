import { Router, Request, Response } from 'express'
import UserRouter from './user/routes'

const router = Router()

router.use('/users', UserRouter)
router.get('/', async(req: Request, res: Response)=> {
    res.send('app get is running')
})
export default router