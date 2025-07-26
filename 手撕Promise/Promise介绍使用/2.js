const pro = new Promise((resolve, reject
) => {
    const time = Math.floor(Math.random() * 5000);
    setTimeout(() => {
        if (Math.random() < 0.5) {
            //成功
            resolve(time)
        } else {
            //失败
            reject("失败")
        }
    }, time);
})