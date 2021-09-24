import { Request, Response, NextFunction } from 'express'
import { NotFoundError } from '../../../lib/customErrorClass'
import { parseIntParam } from '../../../lib/parseParams'
import EpisodeService from '../services'


export const postEpisode = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { episode_title, scenes } = req.body
    const { feaktion_id } = req.params
    const parsed_scenes = scenes.map((scene) => JSON.parse(scene))
    const feaktion_id_int = await parseIntParam(feaktion_id)

    try {
        const data = await EpisodeService.createEpisode({
            feaktion_id: feaktion_id_int,
            episode_title,
            scenes: parsed_scenes
        })

        res.status(201).json({
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
        res.status(200).json({
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

        res.status(200).json({
            result: true,
            message: 'delete episode 성공'
        })
    } catch(err) {
        next(err)
    }
}
