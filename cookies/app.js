/**
 * This example simple sets the number of views from the same client
 * both as a cookie and a response string. 
 */

 const koa = require("koa")
 const app = module.exports = new koa();

 app.use(async function (ctx, next) {
     const n = ~~ ctx.cookies.get("view") + 1;
     ctx.cookies.set("view", n);
     ctx.body = n + "views";
 })

 if (!module.parent) {
     app.listen(3000);
 }