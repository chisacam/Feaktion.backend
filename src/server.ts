import Express, { Application, Response } from 'express'
import 'dotenv/config'
import routes from './apis'
import cookieParser from 'cookie-parser'
import { errorHandler } from './middleware/errorHandler'
import { apiResponseLogger } from './middleware/apiResponseLogger'
import { apiRequestLogger } from './middleware/apiRequestLogger'
import apiResponser from './middleware/apiResponser'

export const startServer = async (): Promise<void> => {
    const app: Application = Express()

    const host: string = process.env.HOST || '0.0.0.0'
    const port: string = process.env.PORT || '3000'

    app.use(Express.json())
    app.use(Express.urlencoded({ extended: true }))
    app.use(cookieParser())

    // Request Router
    app.use(apiRequestLogger)
    app.use('/', routes)

    //error handler
    app.use(errorHandler)

    // 404 handler
    app.use((req, res) => {
        apiResponser({ req, res, statusCode: 404, message: '올바른 접근이 아닙니다.' })
    })

    app.listen(parseInt(port), host, () => {
        console.log(`[SERVER_START] Server is listening on ${host}:${port}`)
    })
}
