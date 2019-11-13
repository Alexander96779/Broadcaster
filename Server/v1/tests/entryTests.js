/* eslint-disable no-undef */
import Chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

Chai.use(chaiHttp);
Chai.should();

// eslint-disable-next-line no-undef
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
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJ0cmVzb3JjQGdtYWlsLmNvbSIsInVzZXJUeXBlIjoidXNlciIsImlhdCI6MTU3MzU4MDQ0MX0.0BYTtsQHCJboY8CSHYh35M8oelhEexkKtbLmDBvSaqw')
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
});
