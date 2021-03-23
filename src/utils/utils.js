/**
 * @name: utils
 * @author: shixiaoxi
 * @date: 2021-03-16 14:46
 * @description：utils
 * @update: 2021-03-16 14:46
 */
const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]'

function objToArr (object) {
    if (!isObject(object)) {
        console.error('Must Be Object')
        return
    }
    const arr = []
    for (const key in object) {
        arr.push(object[key])
    }
    return arr
}

export {
    isObject,
    objToArr
}
