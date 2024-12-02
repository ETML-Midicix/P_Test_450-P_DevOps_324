const router = require("../routes/index")
// const app = require("../index")
const request = require('supertest');

const express = require('express');

const app = express()

app.use('/api/todo', () => require('./routes/todo.api'));

// describe(
//     'test sum', () => {
//         test('test 1+2=3',()=>{
//             expect((2+2).toBe(4))
//         })
//     }
// )



// request(router)
//   .get('*')
//   .expect(200)
//   .end(function(err, res) {
//     if (err) throw err;
//   });

// describe('GET *', function() {
//     it('responds with json', function(done) {
//       request(router)
//         .get('*')
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(200, done);
//     });
//   });

// describe('POST /add', function() {
//     it('responds with json', function(done) {
//       request(router)
//         .post('/add')
//         .send({text: 'john'})
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(200, done);
//   });
// });


// describe("GET /api/todo", () => {
//   it("should return er... a json?", async () => {
//       return request(app)
//           .get("/api/todo")
//           .expect('Content-Type', /json/)
//           .expect(200)
//           .then((res) => {
//               expect(res.statusCode).toBe(200);
//           })
//   });
// });

describe('POST /add', function() {
  it('add.text should be a text', async (done) => {
    await request(app)
      .post('/add')
      // .set('Authorization', 'Bearer TOKEN')
      .send({text: 'john'}) // x-www-form-urlencoded upload
      // .set('Accept', 'application/json')
      // .expect(function(res) {
      //   res.body.text = res.body.text.toLowerCase();
      // })
      .expect(200, {
        text: 'john'
      }, done);
  })
});