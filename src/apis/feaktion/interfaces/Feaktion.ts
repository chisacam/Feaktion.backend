import { feaktion_genre, feaktion_tag, feaktion_user } from '.prisma/client'
import UserInterface from '../../user/interfaces'

export interface feaktionData {
    feaktion_thumb: string
    feaktion_title: string
    feaktion_description: string
    user_id: number
    feaktion_type: string
}

export interface feaktionResponse {
    feaktion_title: string,
    feaktion_description: string | null,
    feaktion_uploaddate: Date,
    feaktion_updatedate: Date,
    feaktion_thumb: string,
    feaktion_type: string,
    feaktion_user: UserInterface.userViewer,
    feaktion_tag: feaktionTagResponse[],
    feaktion_genre: feaktionGenreResponse[]
}

export interface feaktionTagResponse {
    tag: string
}

export interface feaktionGenreResponse {
    genre: string
}

export interface feaktionTag {
    feaktion_id: number
    tag: string
}

export interface feaktionGenre {
    feaktion_id: number
    genre: string
}