import dayjs from 'dayjs'
import { Request, Response, NextFunction } from 'express'
import { logger } from '../lib/logger'

export const apiRequestLogger = (req: Request, res: Response, next: NextFunction): void => {
    const reqTime = new Date().getTime()
    const readableReqTime = dayjs(reqTime).format('YYYY-MM-DD HH:mm:ss')

    const requestObject = {
        timestamp: readableReqTime,
        type: 'request',
        originalUrl: req.originalUrl,
        method: req.method,
        headers: req.headers,
        query: req.query,
        params: req.params,
        reqBody: req.body,
    }

    // 요청 받은시간 저장
    res.locals.requestTime = reqTime
    logger.info(JSON.stringify(requestObject))
    
    next()
}