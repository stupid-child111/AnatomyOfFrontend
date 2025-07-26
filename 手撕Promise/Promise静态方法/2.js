const  pro  = new Promise.any([
    Promise((resolve,reject) => {}),
    Promise.reject(1),
    Promise.reject(1)
]);

setTimeout(() => {
    console.log(pro)
}, 1000);
pro.catch((result => {
    console.log("失败",result)
}))