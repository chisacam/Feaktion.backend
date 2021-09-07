import { IUser } from '../interfaces/Iuser'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const createUser = async(data: IUser) => {
    const user = await prisma.feaktion_user.create({
        data : {
            user_id: data.user_id,
            password: data.password,
            nickname: data.intro,
            profile: data.profile,
            sex: data.sex,
            intro: data.intro,
            agree_info: data.agree_info,
            agree_service: data.agree_service,
            interest: data.interest
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