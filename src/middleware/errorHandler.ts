import { NextFunction, Request, Response } from 'express'

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): unknown => {
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
        res.status(500).json({
            result: false,
            message: err.message || 'server error',
        })
        console.warn(err.stack)
        return next(err)
    }
}