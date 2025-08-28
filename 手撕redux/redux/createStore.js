import ActionTypes from "./utils/ActionTypes";



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
        let isRemove  = false;
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
        type: ActionTypes.INIT()
    })

    return {
        dispatch,
        getState,
        subscribe
    }
} 