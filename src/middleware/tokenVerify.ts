import {Request, Response, NextFunction} from 'express'
import { AuthError } from '../lib/customErrorClass'
import { verifyToken } from '../lib/tokenManager'

export const authToken = async (req: Request, res: Response, next: NextFunction) => {
    const { feaktion_token } = req.cookies

    try {
        const verifyedToken = await verifyToken(feaktion_token)
        res.locals.userInfo = verifyedToken
        next()
    } catch(err) {
        throw new AuthError()
    }

}