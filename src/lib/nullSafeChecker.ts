export const nullStringSafe = (target: string | undefined | null): string => {
    if (target === undefined || target === null) throw new Error()
    return target
}
