import { Request, Response } from 'express'
import { apiResponseLogger } from './apiResponseLogger'

interface IResponseObject {
    req: Request
    res: Response
    result: boolean
    statusCode?: number
    data?: unknown
    message?: string
    token?: string
}

export default ({
    req,
    res,
    statusCode = 200,
    data,
    message,
    token,
    result
}: IResponseObject): void => {
    const payload = {
        result: result,
        statusCode,
        message: message,
        data: data,
        token: token,
    }

    res.locals.payload = payload
    res.status(statusCode).json(payload)

    apiResponseLogger({ req, res })
}
