// Utils
// -----MAP-----
export function mapObj(obj: object = {}, fn: Function) {
    const newObj = {}
    Object.keys(obj).forEach(key => {
        newObj[key] = fn(obj[key])
    })
    return newObj
}

// There should be a better way to take in any numbers of args
export function noop (agr1?:any) {}