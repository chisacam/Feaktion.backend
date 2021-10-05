import { Request, Response, NextFunction } from 'express'
import { NotFoundError } from '../../../lib/customErrorClass'
import { parseIntParam } from '../../../lib/parseParams'
import CommentService from '../services'


export const postComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { comment_body } = req.body
    const { episode_id } = req.params
    const { user_id } = res.locals.userInfo
    const episode_id_int = await parseIntParam(episode_id)

    try {
        const data = await CommentService.createComment({
            episode_id: episode_id_int,
            user_id,
            comment_body
        })

        res.status(201).json({
            result: true,
            message: '댓글 생성완료',
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
        res.status(200).json({
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

        res.status(200).json({
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
        else res.status(401).json({
            result,
            message: '권한이 없습니다.'
        })
    } catch(err) {
        next(err)
    }
}