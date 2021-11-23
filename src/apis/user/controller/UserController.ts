import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import UserInterface from '../interfaces' 
import UserService from '../services'
import { nullStringSafe  } from '../../../lib/nullSafeChecker'
import { NotFoundError, AlreadyExistError, ValidationFailError } from '../../../lib/customErrorClass'
import { parseIntParam } from '../../../lib/parseParams'
import { generateToken } from '../../../lib/tokenManager'
import apiResponser from '../../../middleware/apiResponser'
import FeaktionService from '../../feaktion/services'


export const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { 
        id,
        email,
        password, 
        nickname, 
        sex,  
        agree_info,
        agree_service
    } = req.body
    
    try {
        const salt: number = await parseIntParam(nullStringSafe(process.env.HASH_SALT), 10)
        const encryptedPassword: string = await bcrypt.hash(password, salt)
        const data: UserInterface.userSignup = {
            id,
            email,
            password: encryptedPassword,
            nickname,
            sex,
        }

        const user = await UserService.createUser(data)
        await UserService.agreement(user.user_id, agree_info === 'true', agree_service === 'true')
        apiResponser({
            req,
            res,
            statusCode:201,
            result: true,
            message: 'success'
        })
    } catch(err) {
        next(err)
    }
}

export const signin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body

    try {
        const check_user = await UserService.isExistEmail(email)
        if (!check_user) throw new NotFoundError()

        const isCorrectPassword: boolean = await bcrypt.compare(password, check_user.password)
        if (!isCorrectPassword) throw new ValidationFailError()

        const token: string = await generateToken(check_user.nickname, check_user.user_id)
        res.cookie('feaktion_token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 30
        })
        apiResponser({
            req,
            res,
            statusCode: 200,
            result: true,
            message: 'success',
            token,
        })

    } catch(err) {
        next(err)
    }
}

export const isExistEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email } = req.body
        const foundUser = await UserService.isExistEmail(email)
        if(foundUser) throw new AlreadyExistError()
    
        apiResponser({
            req,
            res,
            statusCode:200,
            result: true,
            message: '사용가능한 email 입니다.'
        })
    } catch(err) {
        next(err)
    }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { password } = req.body
        const { user_id } = res.locals.userInfo
        const check_user = await UserService.isExistUser(user_id)
        if (!check_user) throw new NotFoundError()

        const isCorrectPassword: boolean = await bcrypt.compare(password, check_user.password)
        if (!isCorrectPassword) throw new ValidationFailError()
        await UserService.deleteUser(user_id)
        apiResponser({
            req,
            res,
            statusCode:200,
            result: true,
            message: '유저 삭제완료',
        })
    } catch(err) {
        next(err)
    }
}

export const addInterestGenre = async (req: Request, res: Response, next: NextFunction) => {
    const { genres } = req.body
    const { user_id } = res.locals.userInfo

    try {
        const interest = genres?.map(genre => {
            return {
                interest: genre,
                user_id
            }
        })
        if(interest) throw new Error('not data in body')
        const data = await UserService.addInterestGenre(interest)

        apiResponser({
            req, 
            res, 
            statusCode: 201, 
            result: true,
            data, 
            message: '선호장르 추가완료'
        })
    } catch(err) {
        next(err)
    }
}

export const patchInterestGenre = async (req: Request, res: Response, next: NextFunction) => {
    const { genres, removed_genres } = req.body
    const { user_id } = res.locals.userInfo

    try {
        const interest = genres?.map(genre => {
            return {
                interest: genre,
                user_id
            }
        })
        
        const wrapped_genres = removed_genres?.map((id) => {
            return {
                id
            }
        })

        if(wrapped_genres) await UserService.removeInterestGenre(wrapped_genres)
        if(interest) await UserService.addInterestGenre(interest)

        apiResponser({
            req, 
            res, 
            statusCode: 201, 
            result: true,
            message: '선호장르 수정완료'
        })
    } catch(err) {
        next(err)
    }
}

export const getUserInfo = async (req, res, next) => {
    const { user_id } = res.locals.userInfo
    try {
        const data = await UserService.getUserInfo(user_id)
        apiResponser({
            req,
            res,
            statusCode: 200,
            result: true,
            data
        })
    } catch(err) {
        next(err)
    }   
}

export const getAnotherUserInfo = async (req, res, next) => {
    const { user_id } = req.params
    try {
        const user_id_int = await parseIntParam(user_id)
        const user_data = await UserService.getUserInfo(user_id_int)
        const data = {
            ...user_data,
            novels: await FeaktionService.getUserWritedfeaktions(user_id_int, 'novel', 10),
            shorts: await FeaktionService.getUserWritedfeaktions(user_id_int, 'short', 10),
        }
        apiResponser({
            req,
            res,
            statusCode: 200,
            result: true,
            data
        })
    } catch(err) {
        next(err)
    }   
}

export const getUserWritedNovels = async (req, res, next) => {
    const { user_id } = req.params
    try {
        const user_id_int = await parseIntParam(user_id)
        const data = await FeaktionService.getUserWritedfeaktions(user_id_int, 'novel')
        apiResponser({
            req,
            res,
            statusCode: 200,
            result: true,
            data
        })
    } catch(err) {
        next(err)
    }
}

export const getUserWritedShorts = async (req, res, next) => {
    const { user_id } = req.params
    try {
        const user_id_int = await parseIntParam(user_id)
        const data = await FeaktionService.getUserWritedfeaktions(user_id_int, 'short')
        apiResponser({
            req,
            res,
            statusCode: 200,
            result: true,
            data
        })
    } catch(err) {
        next(err)
    }
}

export const updateUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    const { user_id } = res.locals.userInfo
    const { nickname, profile, intro } = req.body

    try {
        await UserService.updateProfile(user_id, {
            nickname,
            profile,
            intro
        })

        apiResponser({
            req,
            res,
            statusCode: 200,
            result: true,
            message: '유저 정보 수정완료'
        })
    } catch(err) {
        next(err)
    }
}

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
    const { user_id } = res.locals.userInfo
    const { password, new_password } = req.body

    try {
        const check_user = await UserService.isExistUser(user_id)
        if (!check_user) throw new NotFoundError()

        const isCorrectPassword: boolean = await bcrypt.compare(password, check_user.password)
        if (!isCorrectPassword) throw new ValidationFailError()

        const salt = await parseIntParam(nullStringSafe(process.env.HASH_SALT), 10)
        const encryptedPassword: string = await bcrypt.hash(new_password, salt)
        await UserService.changePassword(user_id, encryptedPassword)

        apiResponser({
            req,
            res,
            statusCode: 200,
            result: true,
            message: '비밀번호 변경완료'
        })
    } catch(err) {
        next(err)
    }
}