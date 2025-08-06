const obj = {
    arr: ["1", "2", "3"],

    //1.使用Generator
    [Symbol.iterator](){
        function* generation(){
            for (const item of this.arr) {
                yield item
            }
        }
        return generation.call(this)
    }


    // //2.手动实现迭代器
    // [Symbol.iterator](){
    //     let index = 0;
    //     let arr = this.arr;
    //     return {
    //         next(){
    //             if(index < arr.length){
    //                 return {done:false,value:arr[index++]}
    //             }else{
    //                 return {done: true}
    //             }
    //         }
    //     }
    // }
}

for (const iterator of obj) {
    console.log("iterator:", iterator)
}