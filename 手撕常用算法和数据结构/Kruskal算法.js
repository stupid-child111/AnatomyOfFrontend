const MAX = 100000;
const pointSet = [];
const distance = [
    [0, 4, 7, MAX, MAX],
    [4, 0, 8, 6, MAX],
    [7, 8, 0, 5, MAX],
    [MAX, 6, 5, 0, 7],
    [MAX, MAX, MAX, 7, 0]
]
function Node(value) {
    this.value = value;
    this.neighbor = [];
}
const a = new Node("A");
const b = new Node("B");
const c = new Node("C");
const d = new Node("D");
const e = new Node("E");

pointSet.push(a);
pointSet.push(b);
pointSet.push(c);
pointSet.push(d);
pointSet.push(e);

function canLink(resultList, tempBegin, tempEnd) {
    let beginIn = null;
    let endIn = null;
    for (let i = 0; i < resultList.length; i++) {
        if (resultList[i].indexOf(tempBegin) > -1) {
            beginIn = resultList[i];
        }
        if (resultList[i].indexOf(tempEnd) > -1) {
            endIn = resultList[i];
        }
    }
    if (endIn !== null && beginIn !== null && beginIn === endIn) {
        return false;
    }
    return true;
}

function link(resultList, tempBegin, tempEnd) {
    let beginIn = null;
    let endIn = null;
    for (let i = 0; i < resultList.length; i++) {
        if (resultList[i].indexOf(tempBegin) > -1) {
            beginIn = resultList[i];
        }
        if (resultList[i].indexOf(tempEnd) > -1) {
            endIn = resultList[i];
        }
    }
    //两个点都是新的点
    if (beginIn === null && endIn === null) {
        let newArr = [];
        newArr.push(tempBegin);
        newArr.push(tempEnd);
        resultList.push(newArr);
    }
    //begin在A,end没有在B部落
    else if (beginIn !== null && endIn === null) {
        beginIn.push(tempEnd);
    }
    //begin没有在A部落,end在B
    else if (beginIn === null && endIn !== null) {
        endIn.push(tempBegin);
    }
    //Begin在A,end在B
    else if (beginIn !== null && endIn !== null && beginIn !== endIn) {
        const allIn = beginIn.concat(endIn);
        let needRemove = resultList.indexOf(endIn);
        resultList.splice(needRemove, 1);
        needRemove = resultList.indexOf(beginIn);
        resultList.splice(needRemove,1);
        resultList.push(allIn)
    }
    tempBegin.neighbor.push(tempEnd);
    tempEnd.neighbor.push(tempBegin);
}

function kruskal(pointSet, distance) {  
    let resultList = [];//存放二维数组
    while (true) {
        let minDis = MAX;
        let begin = null;
        let end = null
        for (let i = 0; i < distance.length; i++) {
            for (let j = 0; j < distance[i].length; j++) {
                let tempBegin = pointSet[i];
                let tempEnd = pointSet[j];
                if (i !== j
                    && distance[i][j] < minDis
                    && canLink(resultList, tempBegin, tempEnd)
                ) {
                    minDis = distance[i][j]
                    begin = tempBegin;
                    end = tempEnd;
                }
            }
        }
        link(resultList, begin, end);
        if (resultList.length === 1 && resultList[0].length === pointSet.length) {
            break;
        }
    }
}

kruskal(pointSet,distance);
console.log(pointSet)