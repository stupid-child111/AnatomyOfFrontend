const PEDDING = "pedding";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
    constructor(excutor) {
        this._state = PEDDING;
        this._value = undefined;
        //添加 try catch  捕获错误
        try {
            excutor(this._resolve.bind(this), this._reject.bind(this));
        } catch (error) {
            this._reject(error);
        }
    }

    //封装一个状态函数,改变状态
    /**
     * 改变任务状态
     * @param {String} newState 新状态
     * @param {any} newValue 数据
     */
    _changeState(newState, newValue) {
        if (this._state !== PEDDING) {
            return;
        }
        this._state = newState;
        this._value = newValue;
    }

    /**
     * 标记当前任务完成
     * @params {any} data 任务完成的相关数据
     */
    _resolve(data) {
        this._changeState(FULFILLED, data);
        // this._state = FULFILLED;
        // this._value = data;
    }

    /**
     * 标记当前任务失败
     * @params {any} reason 任务失败的相关原因
     */
    _reject(reason) {
        this._changeState(REJECTED, reason);
        // this._state = REJECTED;
        // this._value = reason;
    }

}





const pro = new MyPromise((resolve, reject) => {
    resolve(111);
    reject(222);
})
console.log(pro)

/*
1.状态改变函数的封装
2.try catch 捕获错误,使用_reject
3.状态改变后,无法再次被改变
*/
