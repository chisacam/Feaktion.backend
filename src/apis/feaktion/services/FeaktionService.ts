import { PrismaClient, feaktion } from '@prisma/client'
import FeaktionInterface from '../interfaces'

const prisma = new PrismaClient()

export const createFeaktion = async (data: FeaktionInterface.feaktionData): Promise<feaktion> => {
    const result = await prisma.feaktion.create({
        data
    })

    return result
}

export const getFeaktion = async (feaktion_id: number): Promise<FeaktionInterface.feaktionResponse | null> => {
    const result = await prisma.feaktion.findUnique({
        select: {
            feaktion_title: true,
            feaktion_description: true,
            feaktion_uploaddate: true,
            feaktion_updatedate: true,
            feaktion_thumb: true,
            feaktion_type: true,
            feaktion_pub: true,
            feaktion_user: {
                select: {
                    id: true,
                    nickname: true,
                    user_id: true
                }
            },
            feaktion_tag: {
                select: {
                    tag: true
                }
            },
            feaktion_genre: {
                select: {
                    genre: true
                }
            },
            episode: {
                select: {
                    episode_id: true,
                    episode_title: true,
                    episode_uploaddate: true,
                    episode_updatedate: true
                }
            },
            _count: {
                select: {
                    comment: true,
                    episode_like: true
                }
            }
        },
        where: {
            feaktion_id
        }
    })

    return result
}

export const getFeaktionMany = async ( user_id: number ) => {
    const genres = await prisma.user_interest.findMany({
        select: {
            interest: true
        },
        where: {
            user_id
        }
    })
    const user_genres = genres.map((data) => data.interest)

    const recent = await prisma.reading_history.findMany({
        take: 20,
        where: {
            user_id
        },
        include: {
            feaktion: {
                include: {
                    feaktion_tag: {
                        select: {
                            tag: true
                        }
                    }
                }
            },
            feaktion_user: {
                select: {
                    nickname: true,
                    user_id: true,
                    id: true
                }
            }
        },
        orderBy: {
            reading_date: 'desc'
        }
    })

    const interest_genres = await prisma.feaktion.findMany({
        take: 20,
        where: {
            feaktion_genre: {
                some: {
                    genre: {
                        in: user_genres
                    }
                }
            }
        },
        orderBy: {
            feaktion_uploaddate: 'desc'
        }
    })

    const novels = await prisma.feaktion.findMany({
        where: {
            feaktion_type: 'novel',
            feaktion_pub: 'public',
            episode: {
                some: {

                }
            }
        },
        orderBy: {
            feaktion_uploaddate: 'desc'
        },
        include: {
            feaktion_user: {
                select: {
                    nickname: true,
                    id: true
                }
            }
        }
    })

    const shorts = await prisma.feaktion.findMany({
        take: 4,
        where: {
            feaktion_type: 'short',
            feaktion_pub: 'public',
            episode: {
                some: {

                }
            }
        },
        orderBy: {
            feaktion_uploaddate: 'desc'
        },
        include: {
            feaktion_user: {
                select: {
                    nickname: true,
                    id: true
                }
            }
        }
    })

    const result = {
        recent,
        interest_genres,
        novels,
        shorts
    }

    return result
}

export const getMyFeaktionMany = async (user_id: number) => {
    const result = await prisma.feaktion.findMany({
        where: {
            user_id
        },
        include: {
            feaktion_user: {
                select: {
                    nickname: true,
                    id: true
                }
            }
        }
    })

    return result
}

export const isFeaktionWriter = async (feaktion_id: number, user_id: number): Promise<boolean> => {
    const result = await prisma.feaktion.findFirst({
        where: {
            feaktion_id,
            user_id
        }
    })

    return result !== null
}

export const deleteFeaktion = async (feaktion_id: number): Promise<feaktion | null> => {
    const result = await prisma.feaktion.delete({
        where: {
            feaktion_id
        }
    })

    return result
}

export const updateFeaktion = async (feaktion_id: number, data: any): Promise<feaktion | null> => {
    const result = await prisma.feaktion.update({
        where: {
            feaktion_id
        },
        data
    })

    return result
}

export const addTag = async (data: FeaktionInterface.feaktionTag[]) => {
    const result = await prisma.feaktion_tag.createMany({
        data
    })

    return result
}

export const deleteTag = async (data) => {
    const result = await prisma.feaktion_tag.deleteMany({
        where: data
    })

    return result
}

export const addGenre = async (data: FeaktionInterface.feaktionGenre[]) => {
    const result = await prisma.feaktion_genre.createMany({
        data
    })

    return result
}

export const deleteGenre = async (data) => {
    const result = await prisma.feaktion_genre.deleteMany({
        where: data
    })

    return result
}

export const getFeaktionCounts = async (feaktion_id: number) => {
    const result = {
        likeCount: 0,
        commentCount: 0
    }
    const commentCount = await prisma.comment.aggregate({
        where: {
            feaktion_id
        },
        _count: {
            comment_id: true
        }
    })

    const likeCount = await prisma.episode_like.aggregate({
        where: {
            feaktion_id
        },
        _count: {
            like_id: true
        }
    })
    result.commentCount = commentCount._count.comment_id
    result.likeCount = likeCount._count.like_id
    return result
}