const koa = require("koa")
const logger = require('koa-logger')
const serve = require('koa-static')
const koaBody = require('koa-body')
const Koa = require('koa')
const fs = require('fs')
const os = require('os')
const path = require('path')

const app = new koa()

// log requests
app.use(logger())

app.use(koaBody({ multipart: true }))

// 404.html
app.use(async function (ctx, next) {
    await next()

    if (ctx.body || !ctx.idempotent) {
        return
    }

    ctx.redirect("./404.html")
})

// public file
app.use(serve(path.join(__dirname, "/public")))

// upload request
app.use(async function (ctx, next) {
    // ignore post method
    if ("POST" !== ctx.method) {
        return await next()
    }

    const file = ctx.request.files.file
    const reader = fs.createReadStream(file.path)
    const stream = fs.createWriteStream(path.join(os.tmpdir(), Math.random().toString()))
    reader.pipe(stream)
    console.log("upload %s -> %s", file.name, stream.path)

    ctx.redirect("/")
})

// listen
app.listen(3000)

console.log("listening on port 3000")
