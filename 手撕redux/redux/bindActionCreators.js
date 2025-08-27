export default function (actionCreators,dispatch){
    if(typeof actionCreators === 'function'){
        return getAutodisPatchActionCreator(actionCreators,dispatch);
    }
    else if(typeof actionCreators === 'object'){
        const result = {};//返回结果
        for (const key in actionCreators) {
            const actionCreator = actionCreators[key];//取出对应的属性值
            if(typeof actionCreator === 'function'){
                result[key] = getAutodisPatchActionCreator(actionCreator,dispatch)
            }
        }
    }
    else{
        throw new TypeError("actionCreators must be an object or function which means action creator")
    }
}

/**
 * 得到一个自动分发的acion创建函数
 */

function getAutodisPatchActionCreator(actionCreators,dispatch){
    return function(...args){
        const action = actionCreators(...args);
        dispatch(action);
    }
}