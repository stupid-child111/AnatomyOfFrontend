<script setup>
import sparkMD5 from "spark-md5";
import { ref } from "vue";

// 上传状态管理
const isUploading = ref(false); // 是否正在上传
const abortControllers = ref([]); // 存储所有请求的中断控制器
const taskPool = ref([]); // 存储正在进行的请求（用于中断后清理）

const CHUNK_SIZE = 1024 * 1024;
const fileHash = ref("");
const fileName = ref("");
const createChunks = (file) => {
  let cur = 0;
  let chunks = [];
  while (cur < file.size) {
    const blob = file.slice(cur, cur + CHUNK_SIZE);
    chunks.push(blob);
    cur += CHUNK_SIZE;
  }
  return chunks;
};

const abortUpload = () => {
  if (!isUploading.value) return; // 未上传时不执行

  // 中断所有请求
  abortControllers.value.forEach(controller => {
    controller.abort(); // 调用每个控制器的 abort 方法
  });

  // 清理状态
  abortControllers.value = [];
  taskPool.value = [];
  isUploading.value = false;

  // 通知用户
  alert("上传已中断");
};

const uploadChunks = async (chunks, existChunks) => {
  // 重置状态
  isUploading.value = true;
  abortControllers.value = []; // 清空历史控制器
  taskPool.value = [];
  //并发请求数  借助内置 FormData对象进行上传
  const data = chunks.map((chunk, index) => {
    return {
      //传递的对象数组
      fileHash: fileHash.value,
      chunkHash: fileHash.value + "-" + index,
      chunk: chunk,
    };
  });
  //通过FormData上传
  const formDatas = data
    .filter((item) => !existChunks.includes(item.chunkHash))
    .map((item) => {
      const formData = new FormData();
      formData.append("filehash", item.fileHash);
      formData.append("chunkhash", item.chunkHash);
      formData.append("chunk", item.chunk);
      return formData;
    });
  // console.log(formDatas);
  const MAX = 6; //最大请求数
  let index = 0;
  let localTaskPool = []; //请求池
  while (index < formDatas.length) {
    // 为每个请求创建独立的中断控制器
    const controller = new AbortController();
    const { signal } = controller;
    abortControllers.value.push(controller); // 存入控制器数组

    const task = fetch("http://localhost:3000/upload", {
      method: "POST",
      body: formDatas[index],
      signal: signal, // 关键：将 signal 传入请求
    }).then((res) => {
      abortControllers.value = abortControllers.value.filter(
        (c) => c !== controller
      );// 请求完成后，从控制器数组和任务池移除
      localTaskPool = localTaskPool.filter((item) => item !== task);
      return res;
    })
    .catch((err) => {
      // 捕获异常，区分是否是中断导致的AbortError
      if (err.name === "AbortError") {
        // 这里可以选择不做特殊处理，因为是用户主动中断的
        console.log("请求被中断，这是正常操作");
      } else {
        // 其他错误，比如网络问题等，可根据需要处理
        console.error("上传过程中出现其他错误：", err);
      }
      // 同样进行清理操作
      abortControllers.value = abortControllers.value.filter(
        (c) => c !== controller
      );
      taskPool.value = taskPool.value.filter((item) => item !== task);
      localTaskPool = localTaskPool.filter((item) => item !== task);
    });

    // taskPool.slice(taskPool.findIndex((item) => item === task))
    localTaskPool.push(task);
    console.log(localTaskPool.length);
    if (localTaskPool.length === MAX) {
      await Promise.race(localTaskPool);
    }
    index++;
  }
  //保证所有请求都完成
  await Promise.all(localTaskPool);

  //通知服务器去合并文件
  mergeRequest();
};

const calHash = (chunks) => {
  return new Promise((resolve) => {
    //存放所有参与计算的切片
    const targets = [];
    const spark = new sparkMD5.ArrayBuffer();
    const fileReader = new FileReader();
    chunks.forEach((chunk, index) => {
      //第一个和最后一个参与计算
      if (index === 0 || index === chunks.length - 1) {
        targets.push(chunk);
      } else {
        //其他的只获取前两个和中间的和后两个字节计算
        targets.push(chunk.slice(0, 2));
        targets.push(chunk.slice(CHUNK_SIZE / 2, CHUNK_SIZE / 2 + 2));
        targets.push(chunk.slice(CHUNK_SIZE, CHUNK_SIZE + 2));
      }
    });
    fileReader.readAsArrayBuffer(new Blob(targets));
    //onload为异步执行
    fileReader.onload = (e) => {
      spark.append(e.target.result);
      // console.log("hash", spark.end());
      //为什么这里写resolve
      resolve(spark.end());
    };
  });
};

const mergeRequest = () => {
  fetch("http://localhost:3000/merge", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      fileHash: fileHash.value,
      fileName: fileName.value,
      size: CHUNK_SIZE,
    }),
  }).then((res) => {
    alert("merge success");
  });
};

const verify = async () => {
  return fetch("http://localhost:3000/verify", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      fileHash: fileHash.value,
      fileName: fileName.value,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      return res;
    });
};

const handleUpload = async (e) => {
  const file = e.target.files;
  if (!file) {
    return;
  } else {
    //读取文件
    console.log(file[0]);
    fileName.value = file[0].name;
    //进行分片
    const chunks = createChunks(file[0]);
    console.log(chunks);

    //计算hash
    const hash = await calHash(chunks);
    fileHash.value = hash;
    console.log(hash);
    //校验hash值
    const data = await verify();
    console.log(data);
    if (!data.data.shouldUpload) {
      alert("秒传成功");
      return;
    }

    //上传分片
    uploadChunks(chunks, data.data.existChunks);
  }
};
</script>

<template>
  <div>
    <h1>大文件上传</h1>
    <input @change="handleUpload" type="file" />
    <button @click="abortUpload" v-if="isUploading">中断上传</button>
  </div>
</template>

<style scoped>
</style>