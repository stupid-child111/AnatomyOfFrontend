//DFS适合探索未知
//BFS适合探索局域
// function Node(value){
//     this.value = value;
//     this.left = null;
//     this.right = null;
// }

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

const a = new Node("a");
const b = new Node("b");
const c = new Node("c");
const d = new Node("d");
const e = new Node("e");
const f = new Node("f");
const g = new Node("g");

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.left = f;
c.right = g;

function DFS(root, target) {
    if (root === null) return false;
    if (root.value === target) return true;
    const left = DFS(root.left, target);
    const right = DFS(root.right, target);
    return left || right;
}

// console.log(DFS(a,"sss"))

function BFS(root, target) {
    if (root === null || root.length === 0) return false;
    let childList = []
    for (let i = 0; i < root.length; i++) {
        if (!root[i]) continue;
        console.log(root[i].value)
        if (root[i] && root[i].value === target) {
            return true;
        } else {
            childList.push(root[i].left)
            childList.push(root[i].right);
        }
    }
    return BFS(childList, target);
}
console.log(BFS([a], "mmm"))