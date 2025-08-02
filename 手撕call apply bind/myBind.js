Function.prototype.myBind = function (thisArg, ...args) {
    return (...reArgs) => {
        return this.call(thisArg, ...args, ...reArgs)
    }
}

const person = {
    name: "111"
}

function func(n1, n2, n3, n4) {
    console.log(this);
    console.log(n1, n2, n3, n4);
    return n1 + n2 + n3 + n4
}

const bindFunc = func.myBind(person,1,2)
const bindFunc2 = bindFunc(3,4)
console.log(bindFunc2)