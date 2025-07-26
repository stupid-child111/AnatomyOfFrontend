const girls = [
    "蒙牛吕布",
    "农夫山泉貂蝉",
    "娃哈哈赵云",
    "康师傅关羽",
    "加多宝诸葛亮",
    "六个核桃司马懿",
    "营养快线孙尚香",
    "红牛马超",
    "百事可乐黄忠",
    "美年达夏侯惇",
    "冰红茶孙策",
    "旺仔牛奶郭嘉",
    "怡宝荀彧",
    "爽歪歪徐晃",
    "优酸乳祝融",
    "百岁山周瑜",
    "北冰洋张辽",
    "AD钙奶大乔",
    "王老吉庞统",
    "露露甄姬"];

function sendMessage(name) {
    return new Promise((resolve, reject) => {
        // 模拟 发送表白短信
        console.log(`李华 to ${name}:我喜欢你`);
        console.log(`李华 等待 ${name}的回答`);
        // 模拟 回复需要一段时间
        setTimeout(() => {
            // 模拟 有10%的几率成功
            if (Math.random() <= 0.1) {
                resolve(`李华,爱老虎油`);
            } else {
                reject(`李华,抱歉,我有别人追了`);
            }
        }, 1000);
    });
}

(async () => {
    let isSuccess = false;
    for (const name of girls) {
        try {
            const reply = await sendMessage(name);
            console.log(reply);
            console.log("表白成功");
            break;
        } catch (error) {
            console.log(error);
            console.log("表白失败");
        }
    }
    if(!isSuccess){
        console.log("你这辈子也就这样了")
    }
})()