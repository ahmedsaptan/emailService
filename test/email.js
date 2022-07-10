const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const server = require("../app");

chai.use(chaiHttp);
describe("Emails", () => {
  describe("/GET mails", () => {
    it("it should GET all the email", async () => {
      const res = await chai.request(server).get("/api/mails");

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");
      expect(res.body.emails).to.be.an("array");
      expect(res.body.emails[0]).to.be.an("object");

      expect(res.body.emails[0]).to.have.keys(
        "id",
        "to",
        "from",
        "subject",
        "text",
        "html",
        "created_at",
        "updated_at",
        "provider",
        "send"
      );
    });
  });

  describe("/POST mails", () => {
    it("it should return error if not provide to an email", async () => {
      const res = await chai.request(server).post("/api/mails").send();
      expect(res.status).to.equal(422);
      expect(res.body).to.be.an("object");
      expect(res.body.message).to.equal('"to" is required');
    });

    it("it should return error if not provide to a valid  email", async () => {
      const res = await chai.request(server).post("/api/mails").send({
        to: "aklh;af",
      });
      expect(res.status).to.equal(422);
      expect(res.body).to.be.an("object");
      expect(res.body.message).to.equal('"to" must be a valid email');
    });

    it("it should return error if not provide subject for email", async () => {
      const res = await chai.request(server).post("/api/mails").send({
        to: "test@g.com",
      });
      expect(res.status).to.equal(422);
      expect(res.body).to.be.an("object");
      expect(res.body.message).to.equal('"subject" is required');
    });

    it("it should return error if not provide text or html", async () => {
      const res = await chai.request(server).post("/api/mails").send({
        to: "test@g.com",
        subject: "test Subject",
      });
      expect(res.status).to.equal(422);
      expect(res.body).to.be.an("object");
      expect(res.body.message).to.equal(
        '"value" must contain at least one of [text, html]'
      );
    });

    it("it should send mail and create mail object successfully with html", async () => {
      const res = await chai.request(server).post("/api/mails").send({
        to: "test@g.com",
        subject: "test Subject",
        html: "<h1>hello</h1>",
      });

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");
      expect(res.body.email).to.be.an("object");
      expect(res.body.email).to.have.keys(
        "id",
        "to",
        "from",
        "subject",
        "text",
        "html",
        "created_at",
        "updated_at",
        "provider",
        "send"
      );
    });

    it("it should send mail and create mail object successfully with text", async () => {
      const res = await chai.request(server).post("/api/mails").send({
        to: "test@g.com",
        subject: "test Subject",
        text: "text",
      });

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");
      expect(res.body.email).to.have.keys(
        "id",
        "to",
        "from",
        "subject",
        "text",
        "html",
        "created_at",
        "updated_at",
        "provider",
        "send"
      );
    });

    it("it should send mail and create mail object successfully with text and send from email also", async () => {
      const res = await chai.request(server).post("/api/mails").send({
        to: "test@g.com",
        subject: "test Subject",
        text: "text",
        from: "from@g.com",
      });

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");
      expect(res.body.email).to.be.an("object");
      expect(res.body.email).to.have.keys(
        "id",
        "to",
        "from",
        "subject",
        "text",
        "html",
        "created_at",
        "updated_at",
        "provider",
        "send"
      );
      expect(res.body.email.from).to.equal("from@g.com");
    });

  });
});
