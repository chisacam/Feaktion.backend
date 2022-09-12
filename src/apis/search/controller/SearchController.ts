import { feaktion_user } from '.prisma/client'
import { Request, Response, NextFunction } from 'express'
import { searchUserByIdAndNickname } from '../services/SearchService'
import { parseIntParam } from '../../../lib/parseParams'
import apiResponser from '../../../middleware/apiResponser'

enum UserSearchType {
  NICKNAME = 'nickname',
  ID = 'id',
  USER = 'user'
}

export const searchUserController = async (req: Request, res: Response, next: NextFunction): Promise<feaktion_user[] | undefined> => {
    const { keyword, type } = req.query// ?type=닉네임&keyword=감나무
    // const { keyword, type } = req.params // /:keyword == 감나무

    try {
        const data = await searchByType(type as string, keyword as string)
        
        apiResponser({ 
            req, 
            res, 
            statusCode: 201, 
            result: true,
            data,
            message: 'search 요청 생성 완료'
        })

        return data
    } catch (e) {
        next(e)
    }
}
const searchByType = async (type: string, keyword: string) => {
    if(UserSearchType.USER === type){
        return await searchUserByIdAndNickname(keyword)
    } else {
        console.log('type fail', type)
    }
    // if (type === UserSearchType.NICKNAME) {
    //     return await searchUserByNickname(keyword)
    // } else if (type === UserSearchType.ID) {
    //     return await searchUserByUserId(keyword)
    // } else {
    //     throw new ValidationFailError('지정되지 않은 타입입니다.')
    // }
}
