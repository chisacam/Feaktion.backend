import Express, { Application } from 'express'
import 'dotenv/config'
import routes from './apis'
import cookieParser from 'cookie-parser'
import { errorHandler } from './middleware/errorHandler'

export const startServer = async (): Promise<void> => {
    const app: Application = Express()

    const host: string = process.env.HOST || '0.0.0.0'
    const port: string = process.env.PORT || '3000'

    app.use(Express.json())
    app.use(Express.urlencoded({extended: false}))
    app.use(cookieParser())
    app.use('/', routes)

    //error handler
    app.use(errorHandler)

    app.listen(parseInt(port), host, () => {
        console.log(`Server listening at ${host}:${port}`)
    })
}
