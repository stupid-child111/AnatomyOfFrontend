import compose from "./utils/compose";
/**
 * 注册中间件
 * @param  {...any} middlewares 所有的中间件
 */

export default function(...middlewares){
    return function(createStore){ //创建仓库的函数
        //用于创建仓库的函数
        return function(reducer,defaultState){
            const store = createStore(reducer,defaultState);
            let dispatch = () => {throw new Error("目前还不能使用diespatch")}
            const simpleStore = {
                getState:store.getState,
                dispatch:store.dispatch
            }
            //给dispatch赋值
            //跟据中间件数组,得到一个dispatch创建函数的数组
            const dispatchProducers = middlewares.map(mid => mid(simpleStore));
            const dispatchProducer = compose(...dispatchProducers)
            dispatch = dispatchProducer(store.dispatch)
            return {
                ...store,
                dispatch
            }
        }
    }
}