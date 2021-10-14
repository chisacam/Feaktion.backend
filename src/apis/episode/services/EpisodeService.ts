import { PrismaClient } from '@prisma/client'
// import EpisodeInterface from '../interfaces'

const prisma = new PrismaClient()

export const createEpisode = async (data: any): Promise<any> => {
    const result = await prisma.episode.create({
        data
    })

    await prisma.feaktion.update({
        where: {
            feaktion_id: data.feaktion_id
        },
        data: {
            feaktion_updatedate: new Date()
        }
    })

    return result
}

export const getEpisode = async (episode_id: number): Promise<any> => {
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
                }
            },
            episode_like: true,
            feaktion_user: {
                select: {
                    nickname: true,
                    id: true,
                    user_id: true
                }
            }
        }
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

export const addEpisodeLike = async (episode_id: number, user_id: number) => {
    const likeExists = await prisma.episode_like.findFirst({
        where: {
            episode_id,
            user_id
        }
    })
    if(likeExists) return false
    const result = await prisma.episode_like.create({
        data: {
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