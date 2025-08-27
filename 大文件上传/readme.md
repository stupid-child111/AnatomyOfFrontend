- 之前学习的时候的一些笔记,和之后的手写概括的差不多


# XHR(axios)   或者  fetch

- 1  实现多文件上传
  multipart/form-data
  所有文件一次上传
  各个文件单独上传
    - 引出大文件上传
    - 切片上传
- 2、实现进度追踪
  fetch 不能实现上传进度追踪，只能实现下载进度追踪
  ajax 实现  xhr.upload.onprogress  上传进度

- -3、实现取消上传
  - xhr.abort()
  - AbortController  
    - 实现断点续传





