import UserInterface from '../interfaces'
import { feaktion_user, user_agreement, PrismaClient } from '@prisma/client'


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
            user_id,
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
        select: {
            user_id: true,
            user_interest: true,
            nickname: true,
            regdate: true,
            profile: true,
            intro: true,
            sex: true
        }
    })

    return result
}

export const updateProfile = async ( user_id: number, data: any ) => {
    const result = await prisma.feaktion_user.update({
        where: {
            user_id
        },
        data
    })

    return result
}

export const changePassword = async ( user_id: number, password: string ) => {
    const result = await prisma.feaktion_user.update({
        where: {
            user_id
        },
        data: {
            password
        }
    })

    return result
}

