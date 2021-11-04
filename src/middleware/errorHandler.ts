import { NextFunction, Request, Response } from 'express'
import { logger } from '../lib/logger'

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    
    switch (err.name) {
    case 'NotFound':
        res.status(404).json({
            result: false,
            message: err.message || 'Not Found',
        })
        break
    case 'ValidationFail':
        res.status(400).json({
            result: false,
            message: err.message || 'Validation Fail',
        })
        break
    case 'AlreadyExist':
        res.status(400).json({
            result: false,
            message: err.message || 'Already Exist'
        })
        break
    case 'AuthError':
        res.status(401).json({
            result: false,
            message: err.message || 'Auth Error'
        })
        break
    default:
        res.status(500).json({
            result: false,
            message: err.message || 'server error',
        })
        logger.error(err.stack)
    }
}