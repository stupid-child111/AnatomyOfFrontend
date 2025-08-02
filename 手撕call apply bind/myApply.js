Function.prototype.myApply = function(thisArg,args){
    const key = Symbol("key");
    thisArg[key] = this;
    const res = thisArg[key](...args);
    delete thisArg[key];
    return res
}


const person = {
    name:"111"
}

function func(num1,num2,num3){
    console.log(this);
    console.log(num1,num2,num3);
    return num1 + num2 + num3;
}

const res = func.myApply(person,[111,222,333]);
console.log(res)