import { Request, Response, NextFunction } from 'express'
import { NotFoundError } from '../../../lib/customErrorClass'
import { parseIntParam } from '../../../lib/parseParams'
import FeaktionService from '../services'


export const postFeaktion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { feaktion_title, feaktion_description, genre, thumb, tag, feaktion_type } = req.body
    const { user_id } = res.locals.userInfo

    try {
        const data = await FeaktionService.createFeaktion({
            feaktion_title,
            feaktion_description,
            user_id,
            feaktion_thumb: 'https://image.novelpia.com',
            feaktion_type
        })

        const feaktion_genre = [{
            feaktion_id: data.feaktion_id,
            genre
        }]

        const feaktion_tag = [{
            feaktion_id: data.feaktion_id,
            tag
        }]
        await FeaktionService.addGenre(feaktion_genre)
    
        await FeaktionService.addTag(feaktion_tag)

        res.status(201).json({
            result: true,
            message: 'feaktion 생성완료',
            data
        })
    } catch(err) {
        next(err)
    }
}

export const getFeaktion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { feaktion_id } = req.params

    try {
        const feaktion_id_int = await parseIntParam(feaktion_id)
        const data = await FeaktionService.getFeaktion(feaktion_id_int)
        if (!data) throw new NotFoundError()
        res.status(200).json({
            result: true,
            message: 'get feaktion 성공',
            data
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

        res.status(200).json({
            result: true,
            message: 'delete feaktion 성공'
        })
    } catch(err) {
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
        else res.status(401).json({
            result,
            message: '권한이 없습니다.'
        })
    } catch(err) {
        next(err)
    }
}