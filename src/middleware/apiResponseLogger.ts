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

    let errorObject: { [k in string]: string } = {
        timestamp: reableResTime,
        type: 'response',
        originalUrl: req.originalUrl,
        method: req.method,
        headers: JSON.stringify(req.headers),
        query: JSON.stringify(req.query),
        params: JSON.stringify(req.params),
        reqBody: req.body,
        executionTimeInMs: (resTime - res.locals.requestTime).toString()
    }

    if (err) {
        errorObject = {
            ...errorObject,
            errorName: err.name,
            errorMessage: err.message,
            stack: JSON.stringify(err.stack)
        }
    }

    logger.info(JSON.stringify(errorObject))

}