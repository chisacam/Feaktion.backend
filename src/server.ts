import Express, {Request, Response, NextFunction, Application} from 'express'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
dotenv.config()

export const startServer = async () => {
  const app: Application = Express()
  app.use(Express.json())
  app.use(Express.urlencoded({extended: false}))

  const host: string = process.env.HOST || '0.0.0.0'
  const port: string = process.env.PORT || '3000'

  app.get('/', async (req: Request, res: Response) => {
    res.send({ Hello: 'World!' })
  })

  // 소설 등록
  app.post('/novel', async(req: Request, res: Response) => {
    const { fiction_id, 
            user_id, 
            fiction_thumb, 
            fiction_title, 
            fiction_description, 
            genre, 
            tag } = req.body;
      
    const novel = await prisma.fiction.create({
      data : {
        fiction_id,
        user_id,
        fiction_thumb,
        fiction_title,
        fiction_description,
        genre,
        tag
      },
    })

    res.status(201).send({ status: "success"})

  })
    
  app.listen(parseInt(port), host, () => {
    console.log(`Server listening at ${host}:${port}`)
  })
}
