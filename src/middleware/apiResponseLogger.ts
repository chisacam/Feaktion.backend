import dayjs from 'dayjs'
import { Request, Response } from 'express'
import { logger } from '../lib/logger'

interface IResponseLoggingObject {
    err?: Error
    req: Request
    res: Response
}

export const apiResponseLogger = ({ err, req, res }: IResponseLoggingObject): void => {
    const resTime = new Date().getTime()
    const reableResTime = dayjs(resTime).format('YYYY-MM-DD HH:mm:ss')

    let responseObject: { [k in string]: string | number } = {
        timestamp: reableResTime,
        type: 'response',
        originalUrl: req.originalUrl,
        statusCode: res.statusCode.toString(),
        payload: res.locals.payload,
        payloadBytes: res.locals.payload ? JSON.stringify(res.locals.payload).length * 2 : 0,
        executionTimeInMs: (resTime - res.locals.requestTime).toString()
    }

    if (err) {
        responseObject = {
            ...responseObject,
            errorName: err.name,
            errorMessage: err.message,
            stack: JSON.stringify(err.stack)
        }
    }

    logger.info(JSON.stringify(responseObject))

}