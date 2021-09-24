import { PrismaClient } from '@prisma/client'
// import EpisodeInterface from '../interfaces'

const prisma = new PrismaClient()

export const createEpisode = async (data: any): Promise<any> => {
    const result = await prisma.episode.create({
        data
    })

    return result
}

export const getEpisode = async (episode_id: number): Promise<any> => {
    const result = await prisma.episode.findUnique({
        where: {
            episode_id
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