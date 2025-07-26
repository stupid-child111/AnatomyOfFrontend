//改造1.js
function sendMessages(name) {
    //返回  Promise对象
    return new Promise((resolve, reject) => {
        console.log(`李华 to ${name}:我喜欢你`);
        console.log(`李华 等待 ${name}的回答`);
        setTimeout(() => {
            if (Math.random() <= 0.5) {
                // 调用成功之后的回调
                resolve(`李华,爱老虎油`)
            } else {
                // 调用失败之后的回调
                reject(`李华,抱歉,我有别人追了`)
            }
        }, 1000)
    })

}

sendMessages("李华").then(
    (reply) => {
        console.log("成功", reply)
    },
    (reply) => {
        console.log("失败", reply);
    }
)