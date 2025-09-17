//比较和交换
function compare(a, b) {
    if (a < b) return true;
    else return false;
}

function exchange(arr, a, b) {
    const temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

function sort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let maxIndex = 0
        for (let j = 1; j < arr.length - i; j++) {
            //当内层循环使用 j < arr.length - 1 - i 时，会导致最后一个未排序的元素被遗漏
            //循环提前终止了一次，导致最后一个未排序元素没有参与比较
            if (compare(arr[maxIndex], arr[j])) {
                maxIndex = j
            }
        }
        exchange(arr, maxIndex, arr.length - 1 - i)
    }
    return arr;
}

const arr = [1, 5, 7, 9, 3, 8, 23, 99, 23, 65, 21]
sort(arr);
console.log(arr)