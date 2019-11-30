import Chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

Chai.use(chaiHttp);
Chai.should();

describe('Entry test', () => {
  // ====== CREATE REDFLAG TEST =====
  it('should be able to create redflag record if user', (done) => {
    const entry = {
      createdOn: '2018-09-10',
      title: 'Job corruption',
      type: 'Redflag',
      location: 'Kimihurura',
    };
    Chai.request(app)
      .post('/api/v1/entry')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJlc3BlMTJAZ21haWwuY29tIiwidXNlclR5cGUiOiJ1c2VyIiwiaWF0IjoxNTczNzMzMjg2fQ.0G5C1Unoh2Lx2ufxzfBt92Zk4QuS4ca3AYpvbrkQxNU')
      .send(entry)
      .end((err, res) => {
        res.body.status.should.be.equal(201);
        res.body.message.should.be.equal('Redflag created successfully');
      });
    done();
  });
  it('should not be able to create redflag record if not user', (done) => {
    const entry = {
      createdOn: '2018-09-10',
      title: 'Job corruption',
      type: 'Redflag',
      location: 'Kimihurura',
    };
    Chai.request(app)
      .post('/api/v1/entry')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaXlpYWxleHBAZ21haWwuY29tIiwidXNlclR5cGUiOiJhZG1pbiIsImlhdCI6MTU3MzU4MTY2NX0.0rnu7oZCott26NFQMZ8Q2K4b-fcl-Db6QGWcOjXrVA0')
      .send(entry)
      .end((err, res) => {
        res.body.status.should.equal(403);
        res.body.error.should.equal('Only users are allowed to add entries');
      });
    done();
  });
  it('should not be able to create redflag if missing info', (done) => {
    const entry = {
      createdOn: '2018-09-10',
      title: 'Job corruption',
      type: 'Redflag',
    };
    Chai.request(app)
      .post('/api/v1/entry')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJ0cmVzb3JjQGdtYWlsLmNvbSIsInVzZXJUeXBlIjoidXNlciIsImlhdCI6MTU3MzU4MDQ0MX0.0BYTtsQHCJboY8CSHYh35M8oelhEexkKtbLmDBvSaqw')
      .send(entry)
      .end((err, res) => {
        res.body.status.should.be.equal(400);
      });
    done();
  });
  // ================ VIEW ALL ENTRIES TEST =========
  it('should be able to view all redflags', (done) => {
    Chai.request(app)
      .get('/api/v1/entries')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJlc3BlMTJAZ21haWwuY29tIiwidXNlclR5cGUiOiJ1c2VyIiwiaWF0IjoxNTczNjQyNjY2fQ.TYNTh-r9_-frQXEPZaB8kZUZTdGiFcYJWDszs33eURA')
      .end((err, res) => {
        res.body.status.should.be.equal(200);
      });
    done();
  });
  // =========== VIEW SPECIFIC ENTRY TEST =========
  it('should be able to view specific entry', (done) => {
    Chai.request(app)
      .get('/api/v1/entries/1')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJ0cmVzb3JjQGdtYWlsLmNvbSIsInVzZXJUeXBlIjoidXNlciIsImlhdCI6MTU3MzU4MDQ0MX0.0BYTtsQHCJboY8CSHYh35M8oelhEexkKtbLmDBvSaqw')
      .end((err, res) => {
        res.body.status.should.be.equal(200);
      });
    done();
  });
  it('should not be able to view specific entry if not exist', (done) => {
    Chai.request(app)
      .get('/api/v1/entries/100')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJ0cmVzb3JjQGdtYWlsLmNvbSIsInVzZXJUeXBlIjoidXNlciIsImlhdCI6MTU3MzU4MDQ0MX0.0BYTtsQHCJboY8CSHYh35M8oelhEexkKtbLmDBvSaqw')
      .end((err, res) => {
        res.body.status.should.be.equal(404);
        res.body.error.should.be.equal('Entry not found');
      });
    done();
  });

  // ============ MODIFY ENTRY TESTS================
  it('should be able to modify entry if created by and is found', (done) => {
    Chai.request(app)
      .patch('/api/v1/entries/1/Location')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJlc3BlMTJAZ21haWwuY29tIiwidXNlclR5cGUiOiJ1c2VyIiwiaWF0IjoxNTczNzMzMjg2fQ.0G5C1Unoh2Lx2ufxzfBt92Zk4QuS4ca3AYpvbrkQxNU')
      .end((err, res) => {
        res.body.status.should.be.equal(200);
        res.body.message.should.be.equal('Location updated');
      });
    done();
  });
  it('should not be able to modify entry if not created by', (done) => {
    Chai.request(app)
      .patch('/api/v1/entries/1/Location')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJ0cmVzb3JjQGdtYWlsLmNvbSIsInVzZXJUeXBlIjoidXNlciIsImlhdCI6MTU3MzczNzE4OX0.zLS5_4h7Q5Q0GpeRoaDWT3nxldp9r1IC_i4rSk_MIeQ')
      .end((err, res) => {
        res.body.status.should.be.equal(401);
        res.body.error.should.be.equal('Can not update this entry');
      });
    done();
  });
  it('should not be able to modify entry if it is not found', (done) => {
    Chai.request(app)
      .patch('/api/v1/entries/10/Location')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJlc3BlMTJAZ21haWwuY29tIiwidXNlclR5cGUiOiJ1c2VyIiwiaWF0IjoxNTczNzMzMjg2fQ.0G5C1Unoh2Lx2ufxzfBt92Zk4QuS4ca3AYpvbrkQxNU')
      .end((err, res) => {
        res.body.status.should.be.equal(404);
        res.body.error.should.be.equal('Entry not found');
      });
    done();
  });
  it('should not be able to modify entry if not user', (done) => {
    Chai.request(app)
      .patch('/api/v1/entries/1/Location')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaXlpYWxleHBAZ21haWwuY29tIiwidXNlclR5cGUiOiJhZG1pbiIsImlhdCI6MTU3MzczNTY2M30.h48vb6ME4x2sOvaRfVI8bcx0SNwB20B6M4yInN2dYHc')
      .end((err, res) => {
        res.body.status.should.be.equal(403);
        res.body.error.should.be.equal('Forbidden route');
      });
    done();
  });
  it('should be able to delete entry if created by', (done) => {
    Chai.request(app)
      .delete('/api/v1/entries/1/Delete')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJlc3BlMTJAZ21haWwuY29tIiwidXNlclR5cGUiOiJ1c2VyIiwiaWF0IjoxNTczODk0ODI3fQ.1ntqUDMMI8TUeK2Bex7c45DVre0DafagUBrawwshce0')
      .end((err, res) => {
        res.body.status.should.be.equal(200);
        res.body.message.should.be.equal('Entry deleted successfully');
      });
    done();
  });
  it('should be not be able to delete if not created by', (done) => {
    Chai.request(app)
      .delete('/api/v1/entries/1/Delete')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJ0cmVzb3JjQGdtYWlsLmNvbSIsInVzZXJUeXBlIjoidXNlciIsImlhdCI6MTU3Mzg5NDI0Mn0.PO7qjq_85fKhi0_GuYKys7joE1FDpPBHO17l8_XlkTQ')
      .end((err, res) => {
        res.body.status.should.be.equal(404);
        res.body.error.should.be.equal('Entry not found');
      });
    done();
  });
});
