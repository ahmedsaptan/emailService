
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server = require('../app');


chai.use(chaiHttp);
describe('Emails', () => {
  // describe('/GET mails', () => {
  //     it('it should GET all the email', (done) => {
  //       chai.request(server)
  //           .get('/api/mails')
  //           .end((err, res) => {

  //             console.log(res.body);
  //               //   res.should.have.status(200);
  //               //   res.body.should.be.a('array');
  //               //   res.body.length.should.be.eql(0);
  //             done();
  //           });
  //     });
  // });



  describe('/POST mails', () => {
    it('it should return error if not provide to an email', async () => {
      const res = await chai.request(server)
          .post('/api/mails')
          .send()
      expect(res.status).to.equal(422);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.equal('"to" is required');
    });

    it('it should return error if not provide to an email', async () => {
      const res = await chai.request(server)
          .post('/api/mails')
          .send({
            to: 'aklh;af'
          })
      expect(res.status).to.equal(422);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.equal('"to" must be a valid email');
    });

    it('it should return error if not provide to an email', async () => {
      const res = await chai.request(server)
          .post('/api/mails')
          .send({
            to: 'test@g.com'
          })
      expect(res.status).to.equal(422);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.equal('"subject" is required');
    });

    it('it should return error if not provide to an email', async () => {
      const res = await chai.request(server)
          .post('/api/mails')
          .send({
            to: 'test@g.com',
            subject: "test Subject"
          })
      expect(res.status).to.equal(422);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.equal('"value" must contain at least one of [text, html]');
    });

    it('it should send mail and create mail object successfully with html', async () => {
      const res = await chai.request(server)
          .post('/api/mails')
          .send({
            to: 'test@g.com',
            subject: "test Subject",
            html: "<h1>hello</h1>"
          })

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.email).to.be.an('object');
      expect(res.body.email).to.have.property('id');
      expect(res.body.email).to.have.property('to');
      expect(res.body.email).to.have.property('subject');
      expect(res.body.email).to.have.property('html');
      expect(res.body.email).to.have.property('text');
      expect(res.body.email).to.have.property('created_at');
      expect(res.body.email).to.have.property('updated_at');
      expect(res.body.email).to.have.property('provider');  
      expect(res.body.email).to.have.property('send');
    });

    it('it should send mail and create mail object successfully with text', async () => {
      const res = await chai.request(server)
          .post('/api/mails')
          .send({
            to: 'test@g.com',
            subject: "test Subject",
            text: "text"
          })

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.email).to.be.an('object');
      expect(res.body.email).to.have.property('id');
      expect(res.body.email).to.have.property('to');
      expect(res.body.email).to.have.property('subject');
      expect(res.body.email).to.have.property('html');
      expect(res.body.email).to.have.property('text');
      expect(res.body.email).to.have.property('created_at');
      expect(res.body.email).to.have.property('updated_at');
      expect(res.body.email).to.have.property('provider');  
      expect(res.body.email).to.have.property('send');
    });

    // it('it should return error if not provide to an email', async () => {
    //   const res = await chai.request(server)
    //       .post('/api/mails')
    //       .send()
    //   expect(res.status).to.equal(422);
    //   expect(res.body).to.be.an('object');
    //   expect(res.body.message).to.equal('"to" is required');
    // });

    // it('it should return error if not provide to an email', async () => {
    //   const res = await chai.request(server)
    //       .post('/api/mails')
    //       .send()
    //   expect(res.status).to.equal(422);
    //   expect(res.body).to.be.an('object');
    //   expect(res.body.message).to.equal('"to" is required');
    // });
});

});