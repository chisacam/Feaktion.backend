export interface userSignup {
    id: string
    email: string
    password: string
    nickname: string
    sex: string
}

export interface userViewer {
    id: string,
    nickname: string,
    user_id?: number
}