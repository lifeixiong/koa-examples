const Koa = require("koa")

const app = new Koa();

app.use(async function (ctx) {
    ctx.body = "hello world";
})

if (!module.parent) {
    app.listen(3000, ()=> {
        console.log(">>> server listen on http://localhost:3000");
    });
}

module.exports = app;