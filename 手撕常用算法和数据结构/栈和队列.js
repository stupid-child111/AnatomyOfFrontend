// function Stack(){
//     this.arr = [];
//     this.push = function (value){
//         this.arr.push(value);
//     }
//     this.pop = function (){
//         return this.arr.pop();
//     }
// }
//ES6 中类的方法

class Stack{
    constructor(){
        this.arr = [];
    }

    push(value){
        this.arr.push(value)
    }

    pop(){
        this.arr.pop();
    }
}


// function Queue(){
//     this.arr = [];
//     this.push = function (value){
//         this.arr.push(value);
//     }
//     this.pop = function (){
//         return this.arr.shift();
//     }
// }
//ES6 中类的方法

class Queue{
    constructor(){
        this.arr = [];
    }

    push(value){
        this.arr.push(value);
    }

    pop(){
        this.arr.shift();
    }
}

const stack = new Stack();
stack.push(100);
console.log(stack.arr);
stack.push(200);
console.log(stack.arr);
stack.push(300);
console.log(stack.arr);
stack.pop();
console.log(stack.arr);
stack.pop();
console.log(stack.arr);


const queue = new Queue();
queue.push(100);
console.log(queue.arr);
queue.push(200);
console.log(queue.arr);
queue.push(300);
console.log(queue.arr);
queue.pop();
console.log(queue.arr);
queue.pop();
console.log(queue.arr);
