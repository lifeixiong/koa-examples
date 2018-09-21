const app = require('../hello-world/app');
const server = app.listen();
const request = require('supertest').agent(server);

describe("hello world", function () {
    after(function () {
        server.close();
    });

    it("should say \"hello world\"", function (done) {
        request.get("/")
            .expect(200)
            .expect("hello world", done)
    })
})