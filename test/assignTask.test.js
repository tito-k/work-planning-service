import chai, { assert } from "chai";
import chaiHttp from "chai-http";
import app from "../src/app.js";

chai.use(chaiHttp);

describe("Assign shift to worker", () => {
  // Assign shift to works as expected
  describe("assign shift to worker accepts worker's email and date to be assigned to", () => {
    it("it should return the worker object, date, startTime and endTime", (done) => {
      chai
        .request(app)
        .post("/assign-shift")
        .set("content-type", "application/json")
        .send({
          email: "komolafetoyin17@gmail.com",
          date: "2022-04-06",
        })
        .end((error, response) => {
          console.log(response);
          assert.equal(response.status, 200);
          assert.equal(response.body.status, "ok");
          assert.equal(
            response.body.message,
            "Successfully assigned shift to worker."
          );
          assert.typeOf(response.body, "object");
          assert.typeOf(response.body.data, "object");
          assert.property(response.body.data, "_id");
          assert.property(response.body.data, "worker");
          assert.typeOf(response.body.data.worker, "object");
          assert.property(response.body.data, "date");
          assert.property(response.body.data, "startTime");
          assert.property(response.body.data, "endTime");
        });
      done();
    });
  });
});
