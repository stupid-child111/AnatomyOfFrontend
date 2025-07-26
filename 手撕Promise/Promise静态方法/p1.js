/**
 * 根据页码获取学生数据，返回Promise
 * @param {Number} page 页码
 */
function fetchStudents(page) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.3) {
        reject(new Error(`网络错误！获取第${page}页数据失败！`));
        return;
      }
      // 模拟学生数据
      const stus = new Array(10).fill(null).map((d, i) => ({
        id: `NO.${(page - 1) * 10 + i + 1}`,
        name: `姓名${(page - 1) * 10 + i + 1}`,
      }));
      resolve(stus);
    }, Math.floor(Math.random() * 5000));
  });
}

// 利用 fetchStudents 函数，完成下面的练习

// 获取1-10页的学生，最终按照页码的顺序合并成一个数组，任何一页的数据获取出现错误，则任务不再继续，打印错误消息
// const pros = [
//     fetchStudents(1),
//     fetchStudents(2),
//     fetchStudents(3),
//     fetchStudents(4),
//     fetchStudents(5),
//     fetchStudents(6),
//     fetchStudents(7),
//     fetchStudents(8),
//     fetchStudents(9),
//     fetchStudents(10),
// ]
const pros = new Array(10)
.fill(1)
.map((it,i) => i + 1)
.map((page) => fetchStudents(page));
// Promise.all(pros).then(
//     (result) => {
//         console.log(result.flat());
//     },
// ).catch((error) => {
//     console.log(error)
// })

// 获取1-10页的学生，最终按照页码的顺序合并成一个数组，如果某些页码的数据获取失败，就不加入该数据即可
// Promise.allSettled(pros)
// .then((result) => {
//     result = result
//     .filter((r) => r.status === 'fulfilled')
//     .map((it) => it.value)
//     .flat();
//     console.log(result)
// })
// 获取1-10页的学生，打印最先获取到的数据，如果全部都获取失败，则打印所有的错误消息
Promise.race(pros)
.then((result) => {
    console.log(result)
})
.catch((error) => {
    console.log(error)
})
// 获取1-10页的学生，输出最先得到的结果（有结果输出结果，有错误输出错误）
// Promise.any(pros)
// .then((result) => {
//     console.log(result)
// })
// .catch((error) => {
//     console.log(error)
// })
