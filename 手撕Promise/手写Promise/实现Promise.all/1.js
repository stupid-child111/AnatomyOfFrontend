Promise.myAll = function (pros) {
    return new Promise((resolve, reject) => {
        try {
            const results = [];
            let count = 0;
            let fulfilledCount = 0;
            for (const p of pros) {
                let i = count;
                count++;
                Promise.resolve(p).then((data) => {
                    fulfilledCount++;
                    results[i] = data;
                    if (fulfilledCount === count) {
                        resolve(results);
                    }
                })
            }
            if (count === 0) {
                resolve(results)
            }
        } catch (error) {
            reject(error)
            console.log(error)
        }

    })
}


// const pro1 = new Promise((resolve,reject) => {
//     setTimeout(() => {
//         resolve(111)
//     }, 1000);
// })

const pro1 = null;
const pro2 = new Promise((resolve) => {
    setTimeout(() => {
        resolve(111)
    }, 1000);
})


const pro3 = new Promise((resolve, reject) => {
    resolve(3)
})

Promise.myAll([pro1, pro2, pro3])
    .then(
        (data) => {
            console.log(data)
        },
        (reason) => {
            console.log(reason)
        }
    )