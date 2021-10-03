import { Request, Response } from 'express'
import { apiResponseLogger } from './apiResponseLogger'

interface IResponseObject {
    req: Request
    res: Response
    statusCode: number
    data?: unknown
    message?: string
}

export default ({ req, res, statusCode, data, message }: IResponseObject): void => {
    const responseObject = {
        success: true,
        statusCode,
        message: message,
        data: data,
    }

    res.status(statusCode).json(responseObject)

    apiResponseLogger({ req, res })
}
