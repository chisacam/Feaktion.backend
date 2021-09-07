import { userSignup } from '../interfaces/user'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const createUser = async(data: userSignup) => {
    const user = await prisma.feaktion_user.create({
        data : {
            id: data.id,
            password: data.password,
            nickname: data.nickname,
            sex: data.sex,
            agree_info: data.agree_info,
            agree_service: data.agree_service,
        }
    })
    return user
}

const findId = async(id: string) => {
    return await prisma.feaktion_user.findFirst({
        where : {
            id
        }
    })
}

export default {
    createUser,
    findId
}