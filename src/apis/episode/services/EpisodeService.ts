import { PrismaClient } from '@prisma/client'
import { NotFoundError } from '../../../lib/customErrorClass'
// import EpisodeInterface from '../interfaces'

const prisma = new PrismaClient()

export const createEpisode = async (data: any): Promise<any> => {
    const result = await prisma.episode.create({
        data
    })

    return result
}

export const getEpisode = async (feaktion_id: number, episode_id: number, user_id: number): Promise<any> => {
    const result = await prisma.episode.findUnique({
        where: {
            episode_id
        },
        include: {
            comment: {
                include: {
                    feaktion_user: {
                        select: {
                            nickname: true,
                            id: true,
                            user_id: true
                        }
                    }
                },
                orderBy: {
                    comment_uploaddate: 'desc'
                }
            },
            episode_like: {
                select: {
                    like_id: true,
                    feaktion_user: {
                        select: {
                            nickname: true,
                            user_id: true,
                            id: true
                        }
                    },
                    like_updatedate: true
                },
                where: {
                    user_id
                }
            },
            feaktion_user: {
                select: {
                    nickname: true,
                    id: true,
                    user_id: true
                }
            },
            _count: {
                select: {
                    comment: true,
                    episode_like: true,
                    reading_history: true
                }
            }
        }
    })
    if(!result) throw new NotFoundError()

    await prisma.reading_history.create({
        data: {
            feaktion_id,
            episode_id,
            user_id
        },
    })

    return result
}

export const deleteEpisode = async (episode_id: number): Promise<any> => {
    const result = await prisma.episode.delete({
        where: {
            episode_id
        }
    })

    return result
}

export const updateEpisode = async (episode_id: number, data: any): Promise<any> => {
    const result = await prisma.episode.update({
        where: {
            episode_id
        },
        data
    })

    return result
}

export const addEpisodeLike = async (episode_id: number, feaktion_id: number, user_id: number) => {
    const likeExists = await prisma.episode_like.findFirst({
        where: {
            episode_id,
            user_id
        }
    })
    if(likeExists) return false
    const result = await prisma.episode_like.create({
        data: {
            feaktion_id,
            episode_id,
            user_id
        }
    })

    return result
}

export const removeEpisodeLike = async (like_id: number) => {
    const likeExists = await prisma.episode_like.findUnique({
        where: {
            like_id
        }
    })
    if(!likeExists) return false
    const result = await prisma.episode_like.delete({
        where: {
            like_id
        }
    })

    return result
}

export const getEpisodeLikeCount = async (episode_id: number) => {
    const likeCount = await prisma.episode_like.aggregate({
        where: {
            episode_id
        },
        _count:{
            like_id: true
        }
    })

    return likeCount._count.like_id
}