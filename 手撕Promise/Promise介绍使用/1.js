//没有Promise的生活像地狱

/**
 * 场景:向他的众多crush表白(人物纯属虚构,切勿带入个人)
 * name:crush的姓名
 * onFulfilled:成功产生的回调
 * onRejected:失败产生的回调
 */
function sendMessages(name, onFulfilled, onRejected) {
    console.log(`李华 to ${name}:我喜欢你`);
    console.log(`李华 等待 ${name}的回答`);
    setTimeout(() => {
        if (Math.random() <= 0.1) {
            // 调用成功之后的回调
            onFulfilled(`李华,爱老虎油`)
        } else {
            // 调用失败之后的回调
            onRejected(`李华,抱歉,我有别人追了`)
        }
    }, 1000)
}


sendMessages(
    "旺仔小乔",
    (reply) => {
        console.log("成功", reply)
    },
    (reply) => {
        console.log("失败", reply);
        sendMessages(
            "可乐大乔",
            (reply) => {
                console.log("成功", reply);
            },
            (reply) => {
                console.log("失败", reply);
                sendMessages(
                    "伊利周瑜",
                    (reply) => {
                        console.log("成功", reply)
                    },
                    (reply) => {
                        console.log("失败", reply);
                        sendMessages(
                            "尖叫张飞",
                            (reply) => { "成功", reply },
                            (reply) => {
                                "失败", reply
                                console.log("李华,这辈子也就这样了");
                            }
                        )
                    }
                )
            }
        )
    }
)//回调地狱