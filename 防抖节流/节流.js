function throttle(func,delay){
    let timeId = null
    return function(...args){
        if(timeId !== undefined){
            return;
        }
        setTimeout(() => {
            func.apply(this,args);
            timeId = undefined;
        }, delay);
    }
}