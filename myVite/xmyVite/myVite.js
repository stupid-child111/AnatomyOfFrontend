//node服务器,处理浏览器各种资源的请求
/**
 * 1.返回index.html 宿主页
 * 2.返回js文件
 * 3.解析vue特殊文件 
 */
const Koa = require("koa");
const app = new Koa();
const fs = require("fs");
const path = require("path")
const complierSFC = require("@vue/compiler-sfc")
const complierDOM = require("@vue/compiler-dom")
const sass = require('sass');

app.use(async ctx => {
    const { url, query } = ctx.request;
    //首页请求 
    if (url === "/") {
        ctx.type = "text/html";
        ctx.body = fs.readFileSync(path.join(__dirname, "./index.html"), "utf-8");
    } else if (url.endsWith(".js")) {
        //js文件的加载处理
        const p = path.join(__dirname, url);
        ctx.type = "application/javascript";
        ctx.body = rewriteImport(fs.readFileSync(p, "utf-8"));
        console.log(p)
    } else if (url.startsWith("/@modules/")) {
        //替换为裸模块去node_modules中查找
        const modulename = url.replace("/@modules/", "");
        const prefix = path.join(__dirname, "../node_modules", modulename);
        //去对应的package.json中获取module字段
        const module = require(path.join(prefix + '/package.json')).module;
        console.log(module, "module")
        const filePath = path.join(prefix, module)
        const ret = fs.readFileSync(filePath, "utf-8");
        ctx.type = "application/javascript";
        ctx.body = rewriteImport(ret);
    } else if (url.indexOf(".vue") > -1) {
        //SFC请求
        //读取vue文件,解析为js
        const p = path.join(__dirname, url.split("?")[0]);
        //得到AST
        const ret = complierSFC.parse(fs.readFileSync(p, "utf-8"));
        if (!query.type) {
            //将AST中的script中的content转换为js文件
            const scriptContent = ret.descriptor.script.content
            //替换默认导出为一个常量,方便后续修改
                        const script = scriptContent.replace("export default", 'const __script = ');
            // 支持 scoped: 预计算 scopeId 与样式导入
            const hasScoped = ret.descriptor.styles && ret.descriptor.styles.some(s => s.scoped);
            const scopeId = hasScoped ? `data-v-${ret.descriptor.id}` : '';
            const styleImports = (ret.descriptor.styles || [])
                .map((s, i) => `import '${url}?type=style&index=${i}&lang=${s.lang || 'css'}'`)
                .join('\n');
            ctx.type = 'application/javascript';
            ctx.body = `
        ${rewriteImport(script)}
        import {render as __render} from '${url}?type=template'
        ${styleImports}
        ${hasScoped ? `__script.__scopeId = '${scopeId}'` : ''}
        __script.render = __render
        export default __script
        `;
        } else if (query.type === 'template') {
            const tpl = ret.descriptor.template.content;
            const hasScoped = ret.descriptor.styles && ret.descriptor.styles.some(s => s.scoped);
            const scopeId = hasScoped ? `data-v-${ret.descriptor.id}` : undefined;
            //编译为render函数（带 scopeId）
            const render = complierDOM.compile(tpl, { mode: 'module', scopeId }).code;
            ctx.type = "application/javascript";
            ctx.body = rewriteImport(render);
        } else if (query.type === "style") {
            const index = parseInt(query.index);
            const style = ret.descriptor.styles[index];
            // 使用 SFC 提供的样式编译，支持 scoped 与预处理器（scss 等）
            const id = `data-v-${ret.descriptor.id}`;
            const result = await complierSFC.compileStyleAsync({
                source: style.content,
                filename: p,
                id,
                scoped: style.scoped,
                preprocessLang: style.lang
            });
            const cssContent = result.code;
            // 将 CSS 注入到页面
            ctx.type = 'application/javascript';
            ctx.body = `
                const style = document.createElement('style');
                style.setAttribute('type','text/css');
                style.textContent = \`${cssContent.replace(/`/g, '\\`')}\`;
                document.head.appendChild(style);
            `;

        }
    }
})

//裸模块地址重写
//import xxx from 'vue  ---> import xxx  from "/@modules/vue"
function rewriteImport(content) {
    return content.replace(/ from ['"](.*)['"]/g, function (s1, s2) {
        if (s2.startsWith("./") || s2.startsWith("../") || s2.startsWith("/")) {
            return s1;
        } else {
            //裸模块替换
            return ` from '/@modules/${s2}'`
        }
    })
}

app.listen(3333, () => {
    console.log(`服务启动在3333端口`)
})