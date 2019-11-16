/* eslint-disable no-undef */
import Chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

Chai.use(chaiHttp);
Chai.should();

describe('Admin tests', () => {
// =============== VIEW ALL USERS TESTS ======
  it('should be able to view all users if admin', (done) => {
    Chai.request(app)
      .get('/api/v1/users')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaXlpYWxleHBAZ21haWwuY29tIiwidXNlclR5cGUiOiJhZG1pbiIsImlhdCI6MTU3MzkwMzEwM30.NNTsFYSVRMUt8d7TCLmEqvuMetKYHijYxT-5fdtt_yg')
      .end((err, res) => {
        res.body.status.should.be.equal(200);
      });
    done();
  });
  it('should not be able to view all users if not admin', (done) => {
    Chai.request(app)
      .get('/api/v1/users')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJlc3BlMTJAZ21haWwuY29tIiwidXNlclR5cGUiOiJ1c2VyIiwiaWF0IjoxNTczNzMzMjg2fQ.0G5C1Unoh2Lx2ufxzfBt92Zk4QuS4ca3AYpvbrkQxNU')
      .end((err, res) => {
        res.body.status.should.be.equal(400);
        res.body.error.should.be.equal('Unauthorized route');
      });
    done();
  });
});
