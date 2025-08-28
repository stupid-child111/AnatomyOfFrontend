/**
 * 得到一个指定长度的随机字符串
 * @param {*} length 
 */
function getRandom(length) {
    return Math.random().toString(36).slice(2, length + 2).split("").join(".")
}

export default {
    INIT(){
        return `@@redux/INIT${getRandom(6)}`
    },
    UNKNOWN(){
        return `@@redux/PROBE_UNKNOWN_ACTION${getRandom(6)}`
    }
}