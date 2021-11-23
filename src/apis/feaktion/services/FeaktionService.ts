import { PrismaClient, feaktion } from '@prisma/client'
import FeaktionInterface from '../interfaces'

const prisma = new PrismaClient()

export const createFeaktion = async (data: FeaktionInterface.feaktionData): Promise<feaktion> => {
    const result = await prisma.feaktion.create({
        data
    })

    return result
}

export const getFeaktion = async (feaktion_id: number, user_id: number): Promise<FeaktionInterface.feaktionResponse | null> => {
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
                    tag: true,
                    id: true
                }
            },
            feaktion_genre: {
                select: {
                    genre: true,
                    id: true
                }
            },
            episode: {
                select: {
                    episode_id: true,
                    episode_title: true,
                    episode_uploaddate: true,
                    episode_updatedate: true,
                    scenes: true
                },
                orderBy: {
                    episode_uploaddate: 'desc'
                }
            },
            _count: {
                select: {
                    comment: true,
                    episode_like: true,
                    episode: true,
                    favorite_feaktion: true,
                    reading_history: true
                }
            },
            favorite_feaktion: {
                where: {
                    user_id
                },
                include: {
                    feaktion_user: {
                        select: {
                            id: true,
                            nickname: true,
                            user_id: true
                        }
                    }
                }
            },
            feaktion_notice: true
        },
        where: {
            feaktion_id
        }
    })

    return result
}

export const getReadedFeaktion = async (user_id: number, take?: number) => {
    const result = await prisma.reading_history.findMany({
        take,
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
                    },
                    feaktion_user: {
                        select: {
                            id: true,
                            nickname: true,
                            user_id: true
                        }
                    },
                    _count: {
                        select: {
                            comment: true,
                            episode: true,
                            episode_like: true,
                            favorite_feaktion: true,
                            reading_history: true
                        }
                    }
                }
            }
        },
        orderBy: {
            reading_date: 'desc'
        },
        distinct: ['feaktion_id']
    })

    return result
}

export const getInterestGenreFeaktion = async (user_id: number, take?: number) => {
    const genres = await prisma.user_interest.findMany({
        select: {
            interest: true
        },
        where: {
            user_id
        }
    })
    const user_genres = genres.map((data) => data.interest)
    const result = await prisma.feaktion.findMany({
        take,
        where: {
            feaktion_genre: {
                some: {
                    genre: {
                        in: user_genres
                    }
                }
            }
        },
        include: {
            feaktion_user: {
                select: {
                    id: true,
                    nickname: true,
                    user_id: true
                }
            }
        },
        orderBy: {
            feaktion_uploaddate: 'desc'
        }
    })

    return result
}

export const getFeaktionManyforMore = async ( user_id: number, feaktion_type: string, take?: number ) => {
    const novels = await prisma.feaktion.findMany({
        take,
        select: {
            feaktion_id: true,
            feaktion_title: true,
            feaktion_thumb: true,
            feaktion_uploaddate: true,
            feaktion_type: true,
            feaktion_user: {
                select: {
                    id: true,
                    nickname: true,
                    user_id: true
                }
            },
            _count: {
                select: {
                    episode: true,
                    episode_like: true,
                    favorite_feaktion: true,
                    comment: true,
                    reading_history: true
                }
            },
            episode: {
                take: 1,
                select: {
                    episode_uploaddate: true,
                },
                orderBy: {
                    episode_uploaddate: 'desc'
                }
            },
            favorite_feaktion: {
                where: {
                    user_id
                },
                include: {
                    feaktion_user: {
                        select: {
                            id: true,
                            nickname: true,
                            user_id: true
                        }
                    }
                }
            }
        },
        where: {
            feaktion_type,
            feaktion_pub: 'public',
            episode: {
                some: {
                    
                }
            }
        },
        orderBy: {
            feaktion_uploaddate: 'desc'
        }
    })

    return novels
}

export const getFeaktionManyforMain = async ( user_id: number ) => {

    const recent = await getReadedFeaktion(user_id, 20)

    const interest_genres = await getInterestGenreFeaktion(user_id, 20)

    const novels = await getFeaktionManyforMore(user_id, 'novel')

    const shorts = await getFeaktionManyforMore(user_id, 'short', 4)

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
                    id: true,
                    user_id: true
                }
            },
            _count: {
                select: {
                    episode: true,
                    episode_like: true,
                    favorite_feaktion: true,
                    reading_history: true
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
        where: {
            OR: data
        }
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
        where: {
            OR: data
        }
    })

    return result
}

export const getFeaktionCounts = async (feaktion_id: number) => {
    //deprecated
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

export const addFavorite = async (feaktion_id: number, user_id: number) => {
    const result = await prisma.favorite_feaktion.create({
        data: {
            feaktion_id,
            user_id
        }
    })

    return result
}

export const deleteFavorite = async (id: number) => {
    const result = await prisma.favorite_feaktion.delete({
        where: {
            id
        }
    })

    return result
}

export const getFavorite = async (user_id: number) => {
    const result = await prisma.favorite_feaktion.findMany({
        where: {
            user_id
        },
        include: {
            feaktion: {
                select: {
                    feaktion_id: true,
                    feaktion_title: true,
                    feaktion_thumb: true,
                    feaktion_description: true,
                    feaktion_uploaddate: true,
                    feaktion_type: true,
                    feaktion_user: {
                        select: {
                            id: true,
                            nickname: true,
                            user_id: true
                        }
                    },
                    favorite_feaktion: {
                        where: {
                            user_id
                        },
                        include: {
                            feaktion_user: {
                                select: {
                                    nickname: true,
                                    id: true,
                                    user_id: true
                                }
                            }
                        }
                    },
                    episode: {
                        take: 1,
                        select: {
                            episode_uploaddate: true
                        }
                    },
                    _count: {
                        select: {
                            episode: true,
                            episode_like: true,
                            favorite_feaktion: true,
                            comment: true,
                            reading_history: true
                        }
                    }
                }
            }
        }
    })

    return result
}

export const getFeaktionNotice = async(id: number) => {
    const result = await prisma.feaktion_notice.findUnique({
        where: {
            id
        },
        include: {
            feaktion_user: {
                select: {
                    nickname: true,
                    id: true,
                    user_id: true
                }
            }
        }
    })

    return result
}

export const deleteFeaktionNotice = async(id: number) => {
    const result = await prisma.feaktion_notice.delete({
        where: {
            id
        }
    })

    return result
}

export const updateFeaktionNotice = async(id: number, data: any) => {
    const result = await prisma.feaktion_notice.update({
        where: {
            id
        },
        data
    })

    return result
}

export const addFeaktionNotice = async(data: any) => {
    const result = await prisma.feaktion_notice.create({
        data
    })

    return result
}

export const getUserWritedfeaktions = async (user_id: number, feaktion_type: string, take?: number) => {
    const result = await prisma.feaktion.findMany({
        take,
        where: {
            user_id,
            feaktion_type
        },
        include: {
            feaktion_user: {
                select: {
                    nickname: true,
                    id: true,
                    user_id: true
                }
            },
            episode: {
                take: 1,
                select: {
                    episode_uploaddate: true,
                },
                orderBy: {
                    episode_uploaddate: 'desc'
                }
            },
            _count: {
                select: {
                    episode: true,
                    episode_like: true,
                    favorite_feaktion: true,
                    reading_history: true
                }
            }
        }
    })

    return result
}