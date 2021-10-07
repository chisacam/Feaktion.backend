import { Request, Response, NextFunction } from 'express'
import { NotFoundError } from '../../../lib/customErrorClass'
import { parseIntParam } from '../../../lib/parseParams'
import apiResponser from '../../../middleware/apiResponser'
import EpisodeService from '../services'


export const postEpisode = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { episode_title, scenes } = req.body
    const { feaktion_id } = req.params
    const feaktion_id_int = await parseIntParam(feaktion_id)

    try {
        const data = await EpisodeService.createEpisode({
            feaktion_id: feaktion_id_int,
            episode_title,
            scenes
        })

        apiResponser({
            req,
            res,
            statusCode: 201,
            result: true,
            message: '에피소드 생성완료',
            data
        })
    } catch(err) {
        next(err)
    }
}

export const getEpisode = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { episode_id } = req.params

    try {
        const episode_id_int = await parseIntParam(episode_id)
        const data = await EpisodeService.getEpisode(episode_id_int)
        if(!data) throw new NotFoundError()
        apiResponser({
            req,
            res,
            statusCode: 200,
            result: true,
            message: 'get episode 성공',
            data
        })
    } catch(err) {
        next(err)
    }
}

export const deleteEpisode = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { episode_id } = req.params

    try {

        const episode_id_int = await parseIntParam(episode_id)
        await EpisodeService.deleteEpisode(episode_id_int)

        apiResponser({
            req,
            res,
            statusCode: 200,
            result: true,
            message: 'delete episode 성공'
        })
    } catch(err) {
        next(err)
    }
}

export const addEpisodeLike = async (req, res, next) => {
    const { episode_id } = req.params
    const { user_id } = res.locals.userInfo

    try {
        const episode_id_int = await parseIntParam(episode_id)
        const data = await EpisodeService.addEpisodeLike(episode_id_int, user_id)
        apiResponser({
            req,
            res,
            statusCode: 201,
            data,
            result: true
        })
    } catch(err) {
        next(err)
    }
}

export const removeEpisodeLike = async(req, res, next) => {
    const { like_id } = req.body
    const { user_id } = res.locals.userInfo

    try {
        const like_it_int = await parseIntParam(like_id)
        await EpisodeService.removeEpisodeLike(like_it_int)
        apiResponser({
            req,
            res,
            statusCode: 200,
            result: true
        })
    } catch(err) {
        next(err)
    }
}