function delay(duration){
    return new Promise((resolve,reject) =>{
        setTimeout(() => {
            resolve();
        },duration)
    })
}

(async () => {
    for(let i = 0;i < 3;i++){
        await delay(1000);
        console.log("OK")
    }
})()