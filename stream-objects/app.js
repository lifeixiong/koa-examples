const koa = require("koa")
const JSONStream = require("streaming-json-stringify")

const app = module.exports = new koa()

app.use(async function (ctx, next) {
    ctx.type = "json";
    const stream = ctx.body = JSONStream()

    stream.on('data', function (chunk) {
        console.log('DATA:')
        console.log(chunk);
    });

    stream.on('end', function () {
        console.log('END');
    });

    stream.on("error", ctx.onerror)

    setImmediate(function () {
        stream.write({
            id: 1
        })

        setImmediate(function () {
            stream.write({
                id: 2
            })

            setImmediate(function () {
                stream.write({
                    id: 3
                })
            })
        })
    })
})

if (!module.parent) {
    app.listen(3000)
    console.log("start localhost:3000")
}