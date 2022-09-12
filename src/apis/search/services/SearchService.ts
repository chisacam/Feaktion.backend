import { feaktion_user } from '@prisma/client'
import { NotFoundError } from '../../../lib/customErrorClass'
import { findUserByNickname, findUserByUserId, findUserAllByIdAndNickname } from '../../user/services/UserService'


export const searchUserByNickname = async (nickname: string): Promise<feaktion_user[]> => {
    const findUser = await findUserByNickname(nickname)

    if (!findUser) {
        throw new NotFoundError('검색한 유저를 찾을 수 없습니다.')
    }

    return findUser
}

export const searchUserByUserId = async (userId: string): Promise<feaktion_user[]> => {
    const findUser = await findUserByUserId(userId)

    if (!findUser) {
        throw new NotFoundError('검색한 유저를 찾을 수 없습니다.')
    }

    return findUser
}

export const searchUserByIdAndNickname = async (keyword: string): Promise<feaktion_user[]> => {
    const findUser = await findUserAllByIdAndNickname(keyword)

    if (!findUser) {
        throw new NotFoundError('검색한 유저를 찾을 수 없습니다.')
    }

    return findUser
}

// 2. 픽션 검색


// 3. 해시태그 검색

// 4. 