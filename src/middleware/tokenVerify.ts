import {Request, Response, NextFunction} from 'express'
import { AuthError, NotFoundError } from '../lib/customErrorClass'
import { verifyToken } from '../lib/tokenManager'
import { isExistUser } from '../apis/user/services/UserService'

export const authToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { feaktion_token } = req.cookies

    try {
        const verifyedToken = await verifyToken(feaktion_token)
        res.locals.userInfo = verifyedToken
        const isExist = await isExistUser(res.locals.userInfo.user_id) // redis 블랙리스트 이용시 변경
        if ( !isExist ) throw new NotFoundError()
        next()
    } catch(err) {
        throw new AuthError()
    }

}