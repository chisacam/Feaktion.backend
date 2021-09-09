export const parseIntParam = async (targetParam: string, defaultValue: number): Promise<number> => {
    const intParam = parseInt(targetParam, 10)
    return Number.isNaN(intParam) ? defaultValue : intParam
}  