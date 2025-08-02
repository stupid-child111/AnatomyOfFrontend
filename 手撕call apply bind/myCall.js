Function.prototype.myCall = function (thisArgs, ...args) {
    // thisArgs.f = this;
    // const res = thisArgs.f(...args);
    // delete thisArgs.f

    //使用Symbol 避免命名冲突
    const key = Symbol("key")
    thisArgs[key] = this;
    const res = thisArgs[key](...args);
    return res;
}

const food = {
    name: "哈密瓜"
}

const func2 = function (numA, numB, numC) {
    console.log(this);
    console.log(numA, numB, numC);
    return numA + numB + numC;
}

const res = func2.myCall(food, 1, 2, 3);
console.log(res)