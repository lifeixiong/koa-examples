const koa = require("koa")
const logger = require("koa-logger")

const app = new koa()

function ignoreAssets(mw) {
    return async function (ctx, next) {
        if (/(\.js|\.css|\.html|\.ico)$/.test(ctx.path)) {
            await next()
        } else {
            await mw.call(this, ctx, next)
        }
    };
}

app.use(ignoreAssets(logger()))

app.use(async function (ctx) {
    ctx.body = "Hello World!"
})

app.listen(3000)

