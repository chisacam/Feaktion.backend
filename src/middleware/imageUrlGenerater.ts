import { Request, Response, NextFunction } from 'express'
import apiResponser from './apiResponser'
import { geturlgenerate, puturlgenerate } from '../lib/imageUrlGenerate'

export const putUrlGenerate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const url = await puturlgenerate()

        apiResponser({
            req,
            res,
            result: true,
            data: {
                url
            }
        })
    } catch(err) {
        next(err)
    }
}

export const getUrlGenerate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const url = await geturlgenerate()

        apiResponser({
            req,
            res,
            result: true,
            data: {
                url
            }
        })
    } catch(err) {
        next(err)
    }
}