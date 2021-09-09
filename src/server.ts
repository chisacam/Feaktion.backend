import Express, { Application } from 'express'
import 'dotenv/config'
import routes from './apis'
import cookieParser from 'cookie-parser'

export const startServer = async (): Promise<void> => {
    const app: Application = Express()

    const host: string = process.env.HOST || '0.0.0.0'
    const port: string = process.env.PORT || '3000'

    app.use(Express.json())
    app.use(Express.urlencoded({extended: false}))
    app.use(cookieParser())
    app.use('/', routes)

    //error handler
    app.use((err: Error, req, res, next) => {
        switch (err.name) {
        case 'NotFound':
            return res.status(404).json({
                result: false,
                message: err.message || 'Not Found',
            })
        case 'ValidationFail':
            return res.status(400).json({
                result: false,
                message: err.message || 'Validation Fail',
            })
        case 'AlreadyExist':
            return res.status(400).json({
                result: false,
                message: err.message || 'Already Exist'
            })
        case 'AuthError':
            return res.status(401).json({
                result: false,
                message: err.message || 'Auth Error'
            })
        default:
            return res.status(500).json({
                result: false,
                message: err.message || 'server error',
                stack: err.stack
            })
        }
    })

    app.listen(parseInt(port), host, () => {
        console.log(`Server listening at ${host}:${port}`)
    })
}
