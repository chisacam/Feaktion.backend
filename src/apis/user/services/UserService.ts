import UserInterface from '../interfaces'
import { PrismaClient } from '@prisma/client'
import { feaktion_user, user_agreement } from '.prisma/client'


const prisma = new PrismaClient()

export const createUser = async (data: UserInterface.userSignup): Promise<feaktion_user> => {
    const user = await prisma.feaktion_user.create({
        data: {
            id: data.id,
            email: data.email,
            password: data.password,
            nickname: data.nickname,
            sex: data.sex
        }
    })

    return user
}

export const isExistEmail = async (email: string): Promise<feaktion_user | null> => {
    const result = await prisma.feaktion_user.findUnique({
        where: {
            email
        }
    })

    return result
}

export const isExistUser = async ( user_id: number ) => {
    const result = await prisma.feaktion_user.findUnique({
        where: {
            user_id
        }
    })

    return result
}

export const deleteUser = async (user_id: number): Promise<feaktion_user | null> => {
    const result = await prisma.feaktion_user.delete({
        where: {
            user_id
        }
    })

    return result
}

export const agreement = async (user_id: number, agree_info: boolean, agree_service: boolean): Promise<user_agreement | null> => {
    const result = await prisma.user_agreement.create({
        data: {
            agree_info,
            agree_service,
        }
    })

    return result
}

export const addInterestGenre = async ( data: any ) => {
    const result = await prisma.user_interest.createMany({
        data
    })

    return result
}

export const removeInterestGenre = async ( data ) => {
    const result = await prisma.user_interest.deleteMany({
        where: {
            OR: data
        }
    })

    return result
}

export const getUserInfo = async ( user_id ) => {
    const result = await prisma.feaktion_user.findUnique({
        where: {
            user_id
        },
        include: {
            user_interest: true,
            user_profile: true
        }
    })

    return result
}