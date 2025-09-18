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

function getIndex(str) {
    for (let i = 0; i < pointSet.length; i++) {
        if (str === pointSet[i].value) return i; // 正确情况：找到则返回索引
    }
    return -1;
}


function getMinDisNode(pointSet, distance, nowPointSet) {
    let fromNode = null;
    let minDisNode = null;
    let minDis = MAX;
    for (let i = 0; i < nowPointSet.length; i++) {
        let nowPointIndex = getIndex(nowPointSet[i].value);
        for (let j = 0; j < distance[nowPointIndex].length; j++) {
            let thisNode = pointSet[j];
            if (nowPointSet.indexOf(thisNode) < 0 && distance[nowPointIndex][j] < minDis) {
                fromNode = nowPointSet[i];
                minDisNode = thisNode;
                minDis = distance[nowPointIndex][j];
            }
        }
    }
    fromNode.neighbor.push(minDisNode);
    minDisNode.neighbor.push(fromNode);
    return minDisNode;
}

function prim(pointSet, distance, start) {
    let nowPointSet = [];
    nowPointSet.push(start)
    while (true) {
        let minDisNode = getMinDisNode(pointSet, distance, nowPointSet);
        nowPointSet.push(minDisNode);
        if (nowPointSet.length === pointSet.length) {
            break;
        }
    }
}

prim(pointSet, distance, pointSet[2])
console.log(pointSet)