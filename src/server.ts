import Express, {Request, Response, NextFunction, Application} from 'express'

export const startServer = async () => {
  const app: Application = Express()
  app.use(Express.json())
  app.use(Express.urlencoded({extended: false}))

  const host: string = process.env.HOST || '0.0.0.0'
  const port: string = process.env.PORT || '3000'

  app.get('/', async (req: Request, res: Response) => {
    res.send({ Hello: 'World!' })
  })

  app.listen(parseInt(port), host, () => {
    console.log(`Server listening at ${host}:${port}`)
  })
}
