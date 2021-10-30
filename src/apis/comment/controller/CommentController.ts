import { Request, Response, NextFunction } from 'express'
import { NotFoundError } from '../../../lib/customErrorClass'
import { parseIntParam } from '../../../lib/parseParams'
import apiResponser from '../../../middleware/apiResponser'
import CommentService from '../services'


export const postComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { comment_body } = req.body
    const { episode_id, feaktion_id } = req.params
    const { user_id } = res.locals.userInfo
    const episode_id_int = await parseIntParam(episode_id)
    const feaktion_id_int = await parseIntParam(feaktion_id)
    try {
        const data = await CommentService.createComment({
            episode_id: episode_id_int,
            feaktion_id: feaktion_id_int,
            user_id,
            comment_body
        })

        apiResponser({
            req,
            res,
            statusCode: 201,
            result: true,
            message: '댓글 생성완료',
            data
        })
    } catch(err) {
        next(err)
    }
}

export const getCommentMany = async (req: Request, res: Response, next: NextFunction) => {
    const { episode_id } = req.params

    try {
        const episode_id_int = await parseIntParam(episode_id)
        const data = await CommentService.getCommentMany(episode_id_int)

        apiResponser({
            req,
            res,
            statusCode: 200,
            result: true,
            message: '댓글 가져오기 완료',
            data
        })
    } catch(err) {
        next(err)
    }
}

export const updateComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { comment_body } = req.body
    const { comment_id } = req.params

    try {
        const comment_id_int = await parseIntParam(comment_id)
        const data = await CommentService.updateComment(comment_id_int, {
            comment_body,
            comment_updatedate: new Date()
        })
        apiResponser({
            req,
            res,
            statusCode: 200,
            result: true,
            message: 'update comment 성공',
            data
        })
    } catch(err) {
        next(err)
    }
}

export const deleteComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { comment_id } = req.params

    try {

        const comment_id_int = await parseIntParam(comment_id)
        await CommentService.deleteComment(comment_id_int)

        apiResponser({
            req,
            res,
            statusCode: 200,
            result: true,
            message: 'delete comment 성공'
        })
    } catch(err) {
        next(err)
    }
}

export const isCommentWriter = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { comment_id } = req.params
    const { user_id } = res.locals.userInfo

    try {
        const comment_id_int = await parseIntParam(comment_id)
        const result = await CommentService.isCommentWriter(comment_id_int, user_id)

        if (result) next()
        else apiResponser({
            req,
            res,
            result,
            message: '권한이 없습니다.'
        })
    } catch(err) {
        next(err)
    }
}