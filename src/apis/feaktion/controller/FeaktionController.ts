import { Request, Response, NextFunction } from 'express'
import { NotFoundError } from '../../../lib/customErrorClass'
import { parseIntParam } from '../../../lib/parseParams'
import apiResponser from '../../../middleware/apiResponser'
import FeaktionService from '../services'


export const postFeaktion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { feaktion_title, feaktion_description, genres, thumb, tags, feaktion_type, feaktion_pub } = req.body
    const { user_id } = res.locals.userInfo

    try {
        const data = await FeaktionService.createFeaktion({
            feaktion_title,
            feaktion_description,
            user_id,
            feaktion_thumb: 'https://image.novelpia.com',
            feaktion_type,
            feaktion_pub
        })

        const feaktion_genre = genres.map((genre) => {
            return {
                feaktion_id: data.feaktion_id,
                genre
            }
        })

        const feaktion_tag = tags.map((tag) => {
            return {
                feaktion_id: data.feaktion_id,
                tag
            }
        })
        await FeaktionService.addGenre(feaktion_genre)

        await FeaktionService.addTag(feaktion_tag)

        apiResponser({ 
            req, 
            res, 
            statusCode: 201, 
            result: true,
            data, 
            message: 'feaktion 생성완료' 
        })
    } catch (err) {
        next(err)
    }
}

export const getFeaktion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { feaktion_id } = req.params

    try {
        const feaktion_id_int = await parseIntParam(feaktion_id)
        const data = await FeaktionService.getFeaktion(feaktion_id_int)
        if (!data) throw new NotFoundError()
        
        apiResponser({ 
            req, 
            res, 
            data, 
            result: true,
            message: 'Get feaktion 성공' 
        })
    } catch (err) {
        next(err)
    }
}

export const getFeaktionMany = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await FeaktionService.getFeaktionMany()
        if (!data) throw new NotFoundError()

        apiResponser({ 
            req, 
            res, 
            result: true,
            data, 
            message: 'Get feaktions 성공' 
        })
    } catch(err) {
        next(err)
    }
}

export const deleteFeaktion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { feaktion_id } = req.params
    
    try {
        const feaktion_id_int = await parseIntParam(feaktion_id)
        await FeaktionService.deleteFeaktion(feaktion_id_int)
        
        apiResponser({ 
            req, 
            res, 
            result: true,
            message: 'Delete feaktion 성공' 
        })
    } catch (err) {
        next(err)
    }
}

export const isFeaktionWriter = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { feaktion_id } = req.params
    const { user_id } = res.locals.userInfo
    
    try {
        const feaktion_id_int = await parseIntParam(feaktion_id)
        const result = await FeaktionService.isFeaktionWriter(feaktion_id_int, user_id)

        if (result) next()
        else apiResponser({ 
            req, 
            res,
            result: false, 
            message: '권한이 없습니다.' })
    } catch (err) {
        next(err)
    }
}