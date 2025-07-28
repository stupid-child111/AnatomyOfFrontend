//借助Promise.all方法实现

Promise.myAllSettled = function(pros){
    const results = [];
    for (const p of pros) {
        results.push(Promise.resolve(p).then((data) => ({
            ststus:"fulfilled",
            data
        }),(reason) => ({
            status:"rejected",
            reason
        })))
    }
    return Promise.all(results)
}

const pro = Promise.myAllSettled([
    1,
    Promise.resolve(1),
    Promise.resolve(1),
    Promise.reject(1),
])

pro.then((result) => {
    console.log(result)
})

