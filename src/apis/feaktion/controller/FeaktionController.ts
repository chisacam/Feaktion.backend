import { Request, Response, NextFunction } from 'express'
import { NotFoundError } from '../../../lib/customErrorClass'
import { parseIntParam } from '../../../lib/parseParams'
import apiResponser from '../../../middleware/apiResponser'
import FeaktionService from '../services'


export const postFeaktion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { feaktion_title, feaktion_description, genres, feaktion_thumbnail, tags, feaktion_type, feaktion_pub } = req.body
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
    const { user_id } = res.locals.userInfo

    try {
        const feaktion_id_int = await parseIntParam(feaktion_id)
        const orig_data = await FeaktionService.getFeaktion(feaktion_id_int, user_id)
        if (!orig_data) throw new NotFoundError()
        const data = {
            ...orig_data,
            isWriter: orig_data.feaktion_user.user_id == user_id
        }
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

export const getFeaktionManyforMain = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { user_id } = res.locals.userInfo
    try {
        const data = await FeaktionService.getFeaktionManyforMain( user_id )
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

export const getFeaktionManyforMoreNovels = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { user_id } = res.locals.userInfo
    try {
        const orig_data = await FeaktionService.getFeaktionManyforMoreNovels(user_id)
        if (!orig_data) throw new NotFoundError()

        const data = orig_data.map(item => {
            return {
                ...item,
                isWriter: item.feaktion_user.user_id == user_id
            }
        })
        apiResponser({ 
            req, 
            res, 
            result: true,
            data, 
            message: 'Get novel feaktions 성공' 
        })
    } catch(err) {
        next(err)
    }
}

export const getFeaktionManyforMoreShorts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { user_id } = res.locals.userInfo
    try {
        const orig_data = await FeaktionService.getFeaktionManyforMoreShorts(user_id)
        if (!orig_data) throw new NotFoundError()

        const data = orig_data.map(item => {
            return {
                ...item,
                isWriter: item.feaktion_user.user_id == user_id
            }
        })
        apiResponser({ 
            req, 
            res, 
            result: true,
            data, 
            message: 'Get shrot feaktions 성공' 
        })
    } catch(err) {
        next(err)
    }
}

export const getMyFeaktionMany = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { user_id } = res.locals.userInfo
    try {
        const data = await FeaktionService.getMyFeaktionMany(user_id)
        if (!data) throw new NotFoundError()

        apiResponser({ 
            req, 
            res, 
            result: true,
            data, 
            message: 'Get My feaktions 성공' 
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

export const updateFeaktion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { feaktion_title, feaktion_description, genres, removed_genres, thumb, tags, removed_tags, feaktion_type, feaktion_pub } = req.body
    const { feaktion_id } = req.params

    try {
        const feaktion_id_int = await parseIntParam(feaktion_id)
        const data = await FeaktionService.updateFeaktion(feaktion_id_int, { 
            feaktion_title, 
            feaktion_description, 
            thumb, 
            feaktion_type, 
            feaktion_pub,
            feaktion_updatedate: new Date()
        })
        if(!data) throw new Error('something is wrong!')

        const wrapped_genres = removed_genres?.map((id) => {
            return {
                id
            }
        })

        const wrapped_tags = removed_tags?.map((id) => {
            return {
                id
            }
        })

        if(wrapped_genres) await FeaktionService.deleteGenre(wrapped_genres)
        if(wrapped_tags) await FeaktionService.deleteTag(wrapped_tags)

        const feaktion_genre = genres?.map((genre) => {
            return {
                feaktion_id: data.feaktion_id,
                genre
            }
        })

        const feaktion_tag = tags?.map((tag) => {
            return {
                feaktion_id: data.feaktion_id,
                tag
            }
        })
        
        if(feaktion_genre) await FeaktionService.addGenre(feaktion_genre)

        if(feaktion_tag) await FeaktionService.addTag(feaktion_tag)
        
        apiResponser({
            req,
            res,
            result: true,
            message: 'update feaktion 성공'
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
        else apiResponser({ 
            req, 
            res,
            result: false, 
            message: '권한이 없습니다.' 
        })
    } catch (err) {
        next(err)
    }
}

export const addFavorite = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { feaktion_id } = req.params
    const { user_id } = res.locals.userInfo

    try {
        const feaktion_id_int = await parseIntParam(feaktion_id)
        const data = await FeaktionService.addFavorite(feaktion_id_int, user_id)

        apiResponser({ 
            req, 
            res, 
            result: true,
            data, 
            message: 'Add favorite feaktion 성공' 
        })
    } catch(err) {
        next(err)
    }
}

export const deleteFavorite = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { user_id } = res.locals.userInfo
    const { favorite_id } = req.body

    try {
        const favorite_id_int = await parseIntParam(favorite_id)
        await FeaktionService.deleteFavorite(favorite_id_int)

        apiResponser({ 
            req, 
            res, 
            result: true,
            message: 'Delete favorite feaktion 성공' 
        })
    } catch(err) {
        next(err)
    }
}

export const getFavorite = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { user_id } = res.locals.userInfo
    try {
        const orig_data = await FeaktionService.getFavorite(user_id)
        if (!orig_data) throw new NotFoundError()

        const data = orig_data.map(item => {
            return {
                ...item,
                isWriter: item.feaktion.feaktion_user.user_id == user_id
            }
        })
        
        apiResponser({ 
            req, 
            res, 
            result: true,
            data, 
            message: 'Get favorite feaktion 성공' 
        })
    } catch(err) {
        next(err)
    }
}

export const getReadedFeaktion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { user_id } = res.locals.userInfo
    try {
        const orig_data = await FeaktionService.getReadedFeaktion(user_id)
        if (!orig_data) throw new NotFoundError()

        const data = orig_data.map(item => {
            return {
                ...item,
                isWriter: item.feaktion.feaktion_user.user_id == user_id
            }
        })

        apiResponser({ 
            req, 
            res, 
            result: true,
            data, 
            message: 'Get readed feaktion 성공' 
        })
    } catch(err) {
        next(err)
    }
}

export const getInterestGenreFeaktion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { user_id } = res.locals.userInfo
    try {
        const orig_data = await FeaktionService.getInterestGenreFeaktion(user_id)
        if (!orig_data) throw new NotFoundError()


        const data = orig_data.map(item => {
            return {
                ...item,
                isWriter: item.feaktion_user.user_id == user_id
            }
        })
        apiResponser({ 
            req, 
            res, 
            result: true,
            data, 
            message: 'Get interest feaktion 성공' 
        })
    } catch(err) {
        next(err)
    }
}

export const getFeaktionNotice = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { notice_id } = req.params
    try {
        const notice_id_int = await parseIntParam(notice_id)
        const data = await FeaktionService.getFeaktionNotice(notice_id_int)

        apiResponser({ 
            req, 
            res, 
            result: true,
            data, 
            message: 'Get feaktion notice 성공' 
        })
    } catch(err) {
        next(err)
    }
}

export const deleteFeaktionNotice = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { notice_id } = req.params
    try {
        const notice_id_int = await parseIntParam(notice_id)
        await FeaktionService.deleteFeaktionNotice(notice_id_int)

        apiResponser({ 
            req, 
            res, 
            result: true,
            message: 'Delete feaktion notice 성공' 
        })
    } catch(err) {
        next(err)
    }
}

export const updateFeaktionNotice = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { notice_id } = req.params
    const { notice_title, notice_body, images } = req.body

    try {
        const notice_id_int = await parseIntParam(notice_id)
        await FeaktionService.updateFeaktionNotice(notice_id_int, {
            notice_title,
            notice_body
        })

        apiResponser({ 
            req, 
            res, 
            result: true,
            message: 'Update feaktion notice 성공' 
        })
    } catch(err) {
        next(err)
    }
}

export const addFeaktionNotice = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { feaktion_id } = req.params
    const { notice_title, notice_body, images } = req.body
    const { user_id } = res.locals.userInfo

    try {
        const feaktion_id_int = await parseIntParam(feaktion_id)
        await FeaktionService.addFeaktionNotice({
            notice_title,
            notice_body,
            feaktion_id: feaktion_id_int,
            user_id
        })

        apiResponser({ 
            req, 
            res, 
            result: true,
            message: 'Add feaktion notice 성공' 
        })
    } catch(err) {
        next(err)
    }
}