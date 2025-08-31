export default function compose(...funcs) {
    if(funcs.length === 0){
        return args => args;
    }else if(funcs.length === 1){
        return funcs[0];
    }

    //函数式编程  关注 “结果”
    return funcs.reduce((fn1,fn2) => (...args) => fn1(fn2(...args)));
    
    //声明式编程   关注 “步骤”
    // return function (...args) {
    //     let lastReturn = null;
    //     for (let i = funcs.length - 1; i >= 0; i--) {
    //         const func = funcs[i];
    //         if (i === funcs.length - 1) {
    //             lastReturn = func(...args)
    //         } else {
    //             lastReturn = func(lastReturn);
    //         }
    //     }
    //     return lastReturn;
    // }
}
function f1(n){
    return n * 2;
}
function f2(n){
    return n + n
}

const func = compose(f1,f2);
console.log(func(3))