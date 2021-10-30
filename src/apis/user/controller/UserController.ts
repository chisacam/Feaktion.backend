import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import UserInterface from '../interfaces' 
import UserService from '../services'
import { nullStringSafe  } from '../../../lib/nullSafeChecker'
import { NotFoundError, AlreadyExistError, ValidationFailError } from '../../../lib/customErrorClass'
import { parseIntParam } from '../../../lib/parseParams'
import { generateToken } from '../../../lib/tokenManager'
import apiResponser from '../../../middleware/apiResponser'


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
        const salt = await parseIntParam(nullStringSafe(process.env.HASH_SALT), 10)
        const encryptedPassword = await bcrypt.hash(password, salt)
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

        const token: string = await generateToken(email, check_user.nickname, check_user.user_id)
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
    const interest = genres.map(genre => {
        return {
            interest: genre,
            user_id
        }
    })
    try {    
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
    const { genres, remove_genres } = req.body
    const { user_id } = res.locals.userInfo
    const interest = genres.map(genre => {
        return {
            interest: genre,
            user_id
        }
    })
    try {    
        await UserService.removeInterestGenre(remove_genres)
        const data = await UserService.addInterestGenre(interest)

        apiResponser({
            req, 
            res, 
            statusCode: 201, 
            data, 
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