const PEDDING = "pedding";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

/**
 * 传递一个微队列任务
 * 把传递的函数放到微队列中
 * @param {Function} callback
 */
function runMircoTask(callback) {
    if (process && process.nextTick) {
        process.nextTick(callback);
    } else if (MutationObserver) {
        const p = document.createElement("p");
        const observe = new MutationObserver(callback);
        observe.observe(p, {
            childList: true,//观察该元素内部的变化
        })
        p.innerHTML = '1';
    } else {
        setTimeout(callback, 0)
    }
}


class Mypromise {
    constructor(executor) {
        this._state = PEDDING;
        this._value = undefined;
        try {
            executor(this._resolve.bind(this), this._reject.bind(this))
        } catch (error) {
            this._reject(error)
        }

    }

    _changeState(newState, value) {
        if (this._state !== PEDDING) {
            return;
        }
        this._state = newState;
        this._value = value;
    }

    _resolve(data) {
        this._changeState(FULFILLED, data);
    }
    _reject(reason) {
        this._changeState(REJECTED, reason);
    }
}

const pro = new Mypromise((resolve, reject) => {
    throw 3
})
console.log(pro)