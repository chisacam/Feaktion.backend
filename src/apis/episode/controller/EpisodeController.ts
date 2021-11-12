import { Request, Response, NextFunction } from 'express'
import { AlreadyExistError, NotFoundError } from '../../../lib/customErrorClass'
import { parseIntParam } from '../../../lib/parseParams'
import apiResponser from '../../../middleware/apiResponser'
import EpisodeService from '../services'

export const postEpisode = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { episode_title, scenes, writer_comment } = req.body
    const { feaktion_id } = req.params
    const { user_id } = res.locals.userInfo


    try {
        const feaktion_id_int = await parseIntParam(feaktion_id)
        const data = await EpisodeService.createEpisode({
            feaktion_id: feaktion_id_int,
            episode_title,
            scenes,
            user_id,
            writer_comment
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

export const updateEpisode = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { episode_title, scenes, writer_comment } = req.body
    const { feaktion_id, episode_id } = req.params


    try {
        const feaktion_id_int = await parseIntParam(feaktion_id)
        const episode_id_int = await parseIntParam(episode_id)
        const data = await EpisodeService.updateEpisode(episode_id_int, {
            feaktion_id: feaktion_id_int,
            episode_title,
            scenes,
            episode_updatedate: new Date(),
            writer_comment
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
    const { feaktion_id, episode_id } = req.params
    const { user_id } = res.locals.userInfo

    try {
        const episode_id_int = await parseIntParam(episode_id)
        const feaktion_id_int = await parseIntParam(feaktion_id)
        const orig_data = await EpisodeService.getEpisode(feaktion_id_int, episode_id_int, user_id)
        if(!orig_data) throw new NotFoundError()
        const data = {
            ...orig_data,
            isWriter: orig_data.feaktion_user.user_id == user_id
        }
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

export const addEpisodeLike = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { episode_id, feaktion_id } = req.params
    const { user_id } = res.locals.userInfo

    try {
        const episode_id_int = await parseIntParam(episode_id)
        const feaktion_id_int = await parseIntParam(feaktion_id)
        const data = await EpisodeService.addEpisodeLike(episode_id_int, feaktion_id_int, user_id)
        if(!data) throw new AlreadyExistError()
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

export const removeEpisodeLike = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { like_id } = req.body

    try {
        const like_it_int = await parseIntParam(like_id)
        const result = await EpisodeService.removeEpisodeLike(like_it_int)
        if(!result) throw new NotFoundError()
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