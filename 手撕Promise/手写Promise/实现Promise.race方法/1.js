Promise.myRace = function (pros) {
    return new Promise((resolve, reject) => {
        for (const p of pros) {
            Promise.resolve(p).then(resolve, reject)
        }
    })
}

const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(11)
    }, 1000);
})

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(111)
    }, 2000);
})

const pro = Promise.myRace([p1, p2])
pro.then((result) => {
    console.log(result)
})
    .catch((reason) => {
        console.log(reason)
    })