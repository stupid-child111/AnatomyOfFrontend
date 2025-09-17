function Node(value){
    this.value = value;
    this.left = null;
    this.right = null;
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

//前序遍历
function f1(node){
    let res = [];
    if(node === null)return res;//如果默认返回的话为undefined,不是一个可迭代的数组，导致使用扩展运算符 ... 时出现类型错误
    res.push(node.value);
    res.push(...f1(node.left));
    res.push(...f1(node.right));
    return res;
}

console.log(f1(a));
