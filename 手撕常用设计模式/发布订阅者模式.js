class evetnBus {
    //私有属性
    #handlers = {
        //事件名:[callback1,callback2,...]
    }

    $on(event, callback) {
        if (this.#handlers[event] === undefined) {
            this.#handlers[event] = []
        };
        this.#handlers[event].push(callback);
    }

    $emit(event, ...args) {
        const funcs = this.#handlers[event] || [];
        funcs.forEach(callback => {
            callback(...args)
        });
    }

    $off(event) {
        this.#handlers[event] = undefined;
    }

    $once(event, callback) {
        //1.借助 $on 和 $off 方法
        this.$on(event, (...args) => {
            callback(...args)
            this.$off(event);
        })

        //2.手写方法
        // if (this.#handlers[event] === undefined) {
        //     this.#handlers[event] = [];
        // }
        // const wrapper = (...args) => {
        //     callback(...args);
        //     this.#handlers[event] = this.#handlers[event].filter(e => e !== wrapper)
        // }
        // this.#handlers[event].push(wrapper)
    }
}

const bus = new evetnBus();
// bus.$on("111", () => { console.log("hello") })
// bus.$on("111", () => { console.log("world") })
// bus.$on("222", () => { console.log("222") })

// bus.$emit("111")
bus.$once("111",() => {console.log('1111111111')})

bus.$emit("111"); // 输出：1111111111
bus.$emit("111"); // 输出：1111111111
// bus.$once("222")