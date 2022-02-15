let mongoose = require("mongoose");
let Movie = require("../models/movie");

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
let should = chai.should();

chai.use(chaiHttp);

//our parent block
describe("Movies", () => {
  beforeEach((done) => {
    Movie.remove({}, (err) => {
      done();
    });
  });
  describe("/GET Movies", () => {
    it("it should get all the movies", (done) => {
      chai
        .request(server)
        .get("/api/v1/movies")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  //Test the /post route
  describe("/post movie", () => {
    it.only("it should not post a movie without title, release_date, vote_average", (done) => {
      let movie = {
        title: "The Avengers",
        release_date: "2012-04-25",
        vote_average: "7.4",
      };
      chai
        .request(server)
        .post("/api/v1/movies")
        .send(movie)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          console.log(res.body);
          res.body.movie.should.have.property("_id");
          done();
        });
    });
  });
});
