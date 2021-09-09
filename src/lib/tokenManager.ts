import jwt, { JwtPayload } from 'jsonwebtoken'
import { nullStringSafe } from './nullSafeChecker'

export const generateToken = async (email: string, nickname: string, user_id: number): Promise<string> => {
    const key = nullStringSafe(process.env.JWT_SECRET)
    const expires = nullStringSafe(process.env.JWT_EXPIRES_IN)

    return jwt.sign(
        {
            email,
            nickname,
            user_id
        },
        key,
        {
            expiresIn: expires,
        }
    )
}

export const verifyToken = async (token: string): Promise<string | JwtPayload> => {
    const key = nullStringSafe(process.env.JWT_SECRET)
    return jwt.verify(token, key)
}
