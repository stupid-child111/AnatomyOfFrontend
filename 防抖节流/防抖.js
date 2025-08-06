function debounce(fun,delay){
    let timeId = null;
    return function(...args){
        clearTimeout(timeId);
        timeId = setTimeout(() => {
            fun.apply(this,args)
        }, delay);        
    }
}

function aaa(){
    console.log("111")
}

debounce(aaa,1000)();