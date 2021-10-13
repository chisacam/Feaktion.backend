import UserInterface from '../../user/interfaces'
import EpisodeInterface from '../../episode/interfaces'
export interface feaktionData {
    feaktion_thumb: string
    feaktion_title: string
    feaktion_description: string
    user_id: number
    feaktion_type: string
    feaktion_pub: string
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
    feaktion_genre: feaktionGenreResponse[],
    episode: EpisodeInterface.episodeResponse[]
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