import isPlainObject from "./utils/isPlainObject";
import ActionTypes from "./utils/ActionTypes";

function validateReducers(reducers) {
    if (typeof reducers !== 'object') {
        throw new TypeError("reducers must be an object")
    }
    if (!isPlainObject(reducers)) {
        throw new TypeError("reducers must be a plain object")
    }
    //验证reduce的返回结果是不是undefined
    for (const key in reducers) {
        if (reducers.hasOwnProperty(key)) {
            const reducer = reducers[key];
            //传递一个特殊的typ值
            const state = reducer(undefined, {
                type: ActionTypes.INIT()
            })
            if (state === undefined) {
                throw new TypeError("reducers must not return undefined")
            }
            state = reducer(undefined, {
                type: ActionTypes.UNKNOWN()
            })
        }
    }
}

export default function (reducers) {
    //1.验证
    validateReducers(reducers);
    /**
     * 返回的一个是reducer函数
     */
    return function (state = {}, action) {
        const newstate = {};
        for (const key in reducers) {
            if (reducers.hasOwnProperty(key)) {
                const reducer = reducers[key];
                newstate[key] = reducer(state[key],action);
            }
        }
        return newstate; //返回新的状态

    }
}