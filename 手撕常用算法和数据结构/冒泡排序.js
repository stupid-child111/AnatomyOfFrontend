//比较和交换
function compare(a, b) {
    if (a > b) return true;
    else return false;
}

function exchange(arr, a, b) {
    const temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

function sort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {//每次已经确定了一个位置,不需要多比较一次
            if (compare(arr[j], arr[j + 1])) {
                exchange(arr, j, j + 1)
            }
        }
    }
    return arr;
}

const arr = [1, 5, 7, 9, 3, 8, 23, 99, 23, 65, 21]
sort(arr);
console.log(arr)