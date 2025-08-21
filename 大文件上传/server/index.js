const express = require("express");
const path = require("path");
const multiparty = require("multiparty");
const fse = require("fs-extra");
const cors = require("cors");
const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.json());
app.use(cors());

//提取文件后缀名
const extractExt = (fileName) => {
    return fileName.slice(fileName.lastIndexOf('.'), fileName.length);
}

const UPLOAD_DIR = path.resolve(__dirname, "uploads")

app.post("/upload", function (req, res) {
    const form = new multiparty.Form();
    form.parse(req, async function (err, fields, files) {
        if (err) {
            res.status(401).json({
                status: false,
                reason: "上传失败,请重新上传"
            })
            return
        }
        // console.log(fields)
        // console.log(files);
        const fileHash = fields["filehash"][0];
        const chunkHash = fields["chunkhash"][0];

        //临时存放目录
        const chunkPath = path.resolve(UPLOAD_DIR, fileHash)
        //不存在,创建
        if (!fse.existsSync(chunkPath)) {
            await fse.mkdir(chunkPath)
        }

        //将切片放入文件夹chunk中包含path(临时存放目录)
        const oldPath = files["chunk"][0]["path"];
        await fse.move(oldPath, path.resolve(chunkPath, chunkHash));

        res.status(200).json({
            status: true,
            message: "上传成功"
        })
    })
})

app.post("/merge", async function (req, res) {
    const { fileHash, fileName, size } = req.body

    //如果已经存在,则无需合并
    //完整文件路径
    const filePath = path.resolve(UPLOAD_DIR, fileHash + extractExt(fileName))
    if (fse.existsSync(filePath)) {
        res.status(200).json({
            status: true,
            message: "秒传"
        })
        return
    }

    //不存在,进行合并
    const chunkDir = path.resolve(UPLOAD_DIR, fileHash);
    if (!fse.existsSync(chunkDir)) {
        res.status(401).json({
            status: false,
            reason: "合并失败,请重新上传"
        })
        return
    }

    //合并操作
    const chunkPaths = await fse.readdir(chunkDir)
    // console.log(chunkPaths);
    chunkPaths.sort((a, b) => {
        return a.split('-')[1] - b.split('-')[1];
    })

    const list = chunkPaths.map((chunkName, index) => {
        return new Promise((resolve) => {
            const chunkPath = path.resolve(chunkDir, chunkName)
            const readStream = fse.createReadStream(chunkPath);
            const writeStream = fse.createWriteStream(filePath, {
                start: index * size,
                end: (index + 1) * size
            });

            readStream.on('end', async () => {
                await fse.unlink(chunkPath)
                resolve();
            })
            readStream.pipe(writeStream)
        })
    })

    await Promise.all(list)
    await fse.remove(chunkDir);
    res.status(200).json({
        status: true,
        message: "合并成功"
    })
})

app.post("/verify", async function (req, res) {
    const { fileHash, fileName } = req.body;
    console.log(fileHash)
    console.log(fileName)

    const filePath = path.resolve(UPLOAD_DIR, fileHash + extractExt(fileName));

    //返回服务器上已经上传成功的切片
    const chunkDir = path.join(UPLOAD_DIR,fileHash);
    let chunkPaths = [];
    if(fse.existsSync(chunkDir)){
       chunkPaths = await fse.readdir(chunkDir)
    }


    if (fse.existsSync(filePath)) {
        //存在,不需要上传
        res.status(200).json({
            status: true,
            data: {
                shouldUpload: false
            }
        })
    } else {
        //不存在,需要上传
        res.status(200).json({
            status: true,
            data: {
                shouldUpload: true,
                //已经上传的切片
                existChunks:chunkPaths
            }
        })
    }

})

app.listen(3000, () => {
    console.log("server is running on 3000")
})