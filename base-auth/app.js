const koa = require("koa");
const auth = require("koa-basic-auth");

const app = module.exports = new koa();

app.use(async function (ctx, next) {
    try {
        await next();
    } catch (err) {
        if (err.status === 401) {
            ctx.status = 401;
            ctx.set('WWW-Authenticate', 'Basic realm=Input User&Password');
            ctx.body = 'can\'t has that';
        } else {
            throw err;
        }
    }
})

// require auth
app.use(auth({ name: 'lifx', pass: '123456' }));

// secret response
app.use(async function(ctx) {
  ctx.body = 'secret';
});

if (!module.parent) app.listen(3000);