import { Request, Response } from 'express'
import { apiResponseLogger } from './apiResponseLogger'

interface IResponseObject {
    req: Request
    res: Response
    statusCode?: number
    data?: unknown
    message?: string
}

export default ({ req, res, statusCode = 200, data, message }: IResponseObject): void => {
    const payload = {
        result: true,
        statusCode,
        message: message,
        data: data,
    }

    res.locals.payload = payload
    res.status(statusCode).json(payload)

    apiResponseLogger({ req, res })
}
