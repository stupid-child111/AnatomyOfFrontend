function quickSort(arr){
    if(arr === null || arr.length === 0)return [];
    let leader = arr[0];
    let left = [];
    let right = [];
    for(let i  = 1;i < arr.length;i++){
        if(arr[i] < leader)left.push(arr[i]);
        else right.push(arr[i])
    }
    left = quickSort(left);
    right = quickSort(right);
    left.push(leader);
    return left.concat(right);
}
const arr = [2,34,5,7,76,4,325,7689,90,213,56,132];
console.log(quickSort(arr))