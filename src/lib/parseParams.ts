export const parseIntParam = async (targetParam: string, defaultValue?: number): Promise<number> => {
    const intParam = parseInt(targetParam, 10)
    if (defaultValue) return Number.isNaN(intParam) ? defaultValue : intParam
    else {
        if (Number.isNaN(intParam)) throw new TypeError()
        else return intParam
    }
}