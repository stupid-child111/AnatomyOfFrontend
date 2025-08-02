//1.定义类
class SingleTon{
    //2.添加私有属性
    static #instance

    //3.添加静态方法
    static getInstance(){
        //4.判断并返回对象
        //为空时,返回undefined  === undefined  不符合
        if(this.#instance === undefined){
            this.#instance = new SingleTon()
        }
        return this.#instance
    }
}


const a1 = SingleTon.getInstance()
const a2 = SingleTon.getInstance()
console.log(a1 === a2)