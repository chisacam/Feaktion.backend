import Express, {Request, Response, NextFunction, Application} from 'express'
import dotenv, { parse } from 'dotenv'
import routes from './user/routes'
dotenv.config()

export const startServer = async () => {
  const app: Application = Express()

  const host: string = process.env.HOST || '0.0.0.0'
  const port: string = process.env.PORT || '3000'
  console.log(11111)
  app.use(Express.json())
  app.use(Express.urlencoded({extended: false}))
  app.use('/api', routes)
  app.get('/', async(req: Request, res: Response)=> {
    res.send("app get is running")
  })
  app.listen(parseInt(port), host, () => {
    console.log(`Server listening at ${host}:${port}`)
  })
}
