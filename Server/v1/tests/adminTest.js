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
        res.body.status.should.be.equal(401);
        res.body.error.should.be.equal('Unauthorized route');
      });
    done();
  });
  //   ============= VIEW ALL ENTRIES TESTS ===================
  it('should be able to view all entries if admin', (done) => {
    Chai.request(app)
      .get('/api/v1/allEntries')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaXlpYWxleHBAZ21haWwuY29tIiwidXNlclR5cGUiOiJhZG1pbiIsImlhdCI6MTU3MzkwMzEwM30.NNTsFYSVRMUt8d7TCLmEqvuMetKYHijYxT-5fdtt_yg')
      .end((err, res) => {
        res.body.status.should.be.equal(200);
      });
    done();
  });
  it('should not be able to view all entries if not admin', (done) => {
    Chai.request(app)
      .get('/api/v1/allEntries')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJlc3BlMTJAZ21haWwuY29tIiwidXNlclR5cGUiOiJ1c2VyIiwiaWF0IjoxNTczNzMzMjg2fQ.0G5C1Unoh2Lx2ufxzfBt92Zk4QuS4ca3AYpvbrkQxNU')
      .end((err, res) => {
        res.body.status.should.be.equal(401);
        res.body.error.should.be.equal('Unauthorized route');
      });
    done();
  });
  //   =========== ACCEPT ENTRY TESTS ===========
  it('should be able to accept entry if admin', (done) => {
    Chai.request(app)
      .patch('/api/v1/entries/1/Accept')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaXlpYWxleHBAZ21haWwuY29tIiwidXNlclR5cGUiOiJhZG1pbiIsImlhdCI6MTU3MzkwMzEwM30.NNTsFYSVRMUt8d7TCLmEqvuMetKYHijYxT-5fdtt_yg')
      .end((err, res) => {
        res.body.status.should.be.equal(200);
        res.body.message.should.be.equal('Entry accepted');
      });
    done();
  });
  it('should not be able to accept entry if it does not exist', (done) => {
    Chai.request(app)
      .patch('/api/v1/entries/5/Accept')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaXlpYWxleHBAZ21haWwuY29tIiwidXNlclR5cGUiOiJhZG1pbiIsImlhdCI6MTU3MzkwMzEwM30.NNTsFYSVRMUt8d7TCLmEqvuMetKYHijYxT-5fdtt_yg')
      .end((err, res) => {
        res.body.status.should.be.equal(404);
        res.body.error.should.be.equal('Entry not found');
      });
    done();
  });
  it('should not be able to accept entry if not admin', (done) => {
    Chai.request(app)
      .patch('/api/v1/entries/1/Accept')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJlc3BlMTJAZ21haWwuY29tIiwidXNlclR5cGUiOiJ1c2VyIiwiaWF0IjoxNTczNzMzMjg2fQ.0G5C1Unoh2Lx2ufxzfBt92Zk4QuS4ca3AYpvbrkQxNU')
      .end((err, res) => {
        res.body.status.should.be.equal(401);
        res.body.error.should.be.equal('Unauthorized route');
      });
    done();
  });
  it('should be able to reject entry if admin', (done) => {
    Chai.request(app)
      .patch('/api/v1/entries/1/Reject')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaXlpYWxleHBAZ21haWwuY29tIiwidXNlclR5cGUiOiJhZG1pbiIsImlhdCI6MTU3MzkwMzEwM30.NNTsFYSVRMUt8d7TCLmEqvuMetKYHijYxT-5fdtt_yg')
      .end((err, res) => {
        res.body.status.should.be.equal(200);
        res.body.message.should.be.equal('Entry rejected');
      });
    done();
  });
  it('should not be able to reject entry if it does not exist', (done) => {
    Chai.request(app)
      .patch('/api/v1/entries/10/Reject')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaXlpYWxleHBAZ21haWwuY29tIiwidXNlclR5cGUiOiJhZG1pbiIsImlhdCI6MTU3MzkwMzEwM30.NNTsFYSVRMUt8d7TCLmEqvuMetKYHijYxT-5fdtt_yg')
      .end((err, res) => {
        res.body.status.should.be.equal(404);
        res.body.error.should.be.equal('Entry not found');
      });
    done();
  });
  it('should not be able to reject entry if not admin', (done) => {
    Chai.request(app)
      .patch('/api/v1/entries/1/Reject')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJlc3BlMTJAZ21haWwuY29tIiwidXNlclR5cGUiOiJ1c2VyIiwiaWF0IjoxNTczNzMzMjg2fQ.0G5C1Unoh2Lx2ufxzfBt92Zk4QuS4ca3AYpvbrkQxNU')
      .end((err, res) => {
        res.body.status.should.be.equal(401);
        res.body.error.should.be.equal('Unauthorized route');
      });
    done();
  });
  it('should be able to resolve entry if admin', (done) => {
    Chai.request(app)
      .patch('/api/v1/entries/1/Resolve')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaXlpYWxleHBAZ21haWwuY29tIiwidXNlclR5cGUiOiJhZG1pbiIsImlhdCI6MTU3MzkwMzEwM30.NNTsFYSVRMUt8d7TCLmEqvuMetKYHijYxT-5fdtt_yg')
      .end((err, res) => {
        res.body.status.should.be.equal(200);
        res.body.message.should.be.equal('Entry resolved');
      });
    done();
  });
  it('should not be able to resolve entry if it does not exist', (done) => {
    Chai.request(app)
      .patch('/api/v1/entries/10/Resolve')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaXlpYWxleHBAZ21haWwuY29tIiwidXNlclR5cGUiOiJhZG1pbiIsImlhdCI6MTU3MzkwMzEwM30.NNTsFYSVRMUt8d7TCLmEqvuMetKYHijYxT-5fdtt_yg')
      .end((err, res) => {
        res.body.status.should.be.equal(404);
        res.body.error.should.be.equal('Entry not found');
      });
    done();
  });
  it('should not be able to resolve entry if not admin', (done) => {
    Chai.request(app)
      .patch('/api/v1/entries/1/Resolve')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJlc3BlMTJAZ21haWwuY29tIiwidXNlclR5cGUiOiJ1c2VyIiwiaWF0IjoxNTczNzMzMjg2fQ.0G5C1Unoh2Lx2ufxzfBt92Zk4QuS4ca3AYpvbrkQxNU')
      .end((err, res) => {
        res.body.status.should.be.equal(401);
        res.body.error.should.be.equal('Unauthorized route');
      });
    done();
  });
});
