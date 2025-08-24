/**
 * 判断对象是否是平面对象
 * @param {*} obj 
 */
function isPlainObject(obj) {
    // if(typeof obj !== Object)
    if (typeof obj !== "object") {
        return false;
    }
    // return obj.__proto__ === Object.prototype
    return Object.getPrototypeOf(obj) === Object.prototype
}

/**
 * 得到一个指定长度的随机字符串
 * @param {*} length 
 */
function getRandom(length) {
    return Math.random().toString(36).slice(2, length + 2).split("").join(".")
}


/**
 *实现createStore的功能 
 * @param {function} reducer 
 * @param {any} defaultState 
 */
export default function (reducer, defaultState) {
    let currentReducer = reducer,
        currentState = defaultState

    const listeners = [];//记录所有监听器    
    function dispatch(action) {
        //验证action
        if (!isPlainObject(action)) {
            throw new TypeError("action must be a plain object");
        }
        //验证action的type属性是否存在
        if (action.type === undefined) {
            throw new TypeError("action must has a property of type");
        }
        currentState = currentReducer(currentState, action);

        //运行所有的订阅者
       for (const listener of listeners) {
        listener();
       } 
    };

    function getState() {
        return currentState;
    };

    /**
     * 添加一个订阅器
     */
    function subscribe(listener) {
        listeners.push(listener)
        //返回取消监听的函数
        const isRemove  = false;
        return function(){
            if(isRemove){
                return
            }
            //listener移除出数组
            const index = listeners.indexOf(listener);
            listeners.splice(index,1);
            isRemove = true;
        }
    }
    //创建仓库时,需要分发一次初始的action
    dispatch({
        type: `@@redux/INIT${getRandom(7)}`
    })

    return {
        dispatch,
        getState,
        subscribe
    }
} 