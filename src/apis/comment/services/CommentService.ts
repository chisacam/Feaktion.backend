import { PrismaClient } from '@prisma/client'
// import EpisodeInterface from '../interfaces'

const prisma = new PrismaClient()

export const createComment = async (data: any): Promise<any> => {
    const result = await prisma.comment.create({
        data
    })

    return result
}

export const deleteComment = async (comment_id: number): Promise<any> => {
    const result = await prisma.comment.delete({
        where: {
            comment_id
        }
    })

    return result
}

export const updateComment = async (comment_id: number, data: any): Promise<any> => {
    const result = await prisma.comment.update({
        where: {
            comment_id
        },
        data
    })

    return result
}

export const isCommentWriter = async (comment_id: number, user_id: number) => {
    const result = await prisma.comment.findFirst({
        where: {
            comment_id,
            user_id
        }
    })

    return result !== null
}