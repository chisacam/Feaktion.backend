import { PrismaClient } from '@prisma/client'
import { feaktion } from '.prisma/client'
import FeaktionInterface from '../interfaces'

const prisma = new PrismaClient()

export const createFeaktion = async (data: FeaktionInterface.feaktionData): Promise<feaktion> => {
    const result = await prisma.feaktion.create({
        data
    })

    return result
}

export const getFeaktion = async (feaktion_id: number): Promise<FeaktionInterface.feaktionResponse | null> => {
    const result = await prisma.feaktion.findUnique({
        select: {
            feaktion_title: true,
            feaktion_description: true,
            feaktion_uploaddate: true,
            feaktion_updatedate: true,
            feaktion_thumb: true,
            feaktion_type: true,
            feaktion_user: {
                select: {
                    id: true,
                    nickname: true
                }
            },
            feaktion_tag: {
                select: {
                    tag: true
                }
            },
            feaktion_genre: {
                select: {
                    genre: true
                }
            },
            episode: {
                select: {
                    episode_id: true,
                    episode_title: true,
                    episode_uploaddate: true,
                    episode_updatedate: true,
                    scene: {
                        select: {
                            scene_title: true
                        }
                    }
                }
            }
        },
        where: {
            feaktion_id
        }
    })

    return result
}

export const isFeaktionWriter = async (feaktion_id: number, user_id: number): Promise<boolean> => {
    const result = await prisma.feaktion.findFirst({
        where: {
            feaktion_id,
            user_id
        }
    })

    return result !== null
}

export const deleteFeaktion = async (feaktion_id: number): Promise<feaktion | null> => {
    const result = await prisma.feaktion.delete({
        where: {
            feaktion_id
        }
    })

    return result
}

export const updateFeaktion = async (feaktion_id: number, data: any): Promise<feaktion | null> => {
    const result = await prisma.feaktion.update({
        where: {
            feaktion_id
        },
        data
    })

    return result
}

export const addTag = async (data: FeaktionInterface.feaktionTag[]) => {
    const result = await prisma.feaktion_tag.createMany({
        data
    })

    return result
}

export const addGenre = async (data: FeaktionInterface.feaktionGenre[]) => {
    const result = await prisma.feaktion_genre.createMany({
        data
    })

    return result
}