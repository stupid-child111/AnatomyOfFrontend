/**
 * 判断对象是否是平面对象
 * @param {*} obj 
 */
export default function isPlainObject(obj) {
    // if(typeof obj !== Object)
    if (typeof obj !== "object") {
        return false;
    }
    // return obj.__proto__ === Object.prototype
    return Object.getPrototypeOf(obj) === Object.prototype
}
