import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import auth from '../helpers/authanticate';

chai.use(chaiHttp);
chai.should();

const user1 = 'User';
const user2 = 'Admin';

const incident1 = {
  title: 'Job Corruption',
  body: 'asdfghjklsjbhsvhvcsjhvchjdcx',
  type: 'Red flag',
  location: 'Ruhango',
  status: 'draft',
  images: 'image.jpg',
  videos: 'video.mp4',
  comment: 'Would be very helpful',
};
const incident2 = {
  title: 'Road Fixing',
  body: 'asdfghjklsjbhsvhvcsjhvchjdcx',
  location: 'Ruhango',
  status: 'draft',
  images: 'image.jpg',
  videos: 'video.mp4',
  comment: 'Would be very helpful',
};

const userToken = auth.genererateToken(1, user1);
const adminToken = auth.genererateToken(2, user2);

describe('Incident tests', () => {
  // ========== CREATE INCIDENT TESTS ===============
  it('should be able to create incident if user', (done) => {
    chai.request(app)
      .post('/api/v2/incident')
      .set('token', userToken)
      .send(incident1)
      .end((err, res) => {
        res.body.status.should.be.equal(201);
      });
    done();
  });
  it('should not be able to create incident if not user', (done) => {
    chai.request(app)
      .post('/api/v2/incident')
      .set('token', adminToken)
      .send(incident1)
      .end((err, res) => {
        res.body.status.should.be.equal(401);
        res.body.error.should.be.equal('Only users are allowed to creat incidents');
      });
    done();
  });
  it('should not be able to create incident, if validation errors', (done) => {
    chai.request(app)
      .post('/api/v2/incident')
      .set('token', userToken)
      .send(incident2)
      .end((err, res) => {
        res.body.status.should.be.equal(400);
      });
    done();
  });
  // =========== VIEW ALL TESTS ============
  it('should be able to view all records', (done) => {
    chai.request(app)
      .get('/api/v2/red-flags')
      .set('token', userToken)
      .end((err, res) => {
        res.body.status.should.be.equal(200);
      });
    done();
  });
  // ======== VIEW SPECIFIC TESTS ==============
  it('should be able to view specific incident', (done) => {
    chai.request(app)
      .get('/api/v2/red-flag/1')
      .set('token', userToken)
      .end((err, res) => {
        res.body.status.should.be.equal(200);
        res.body.message.should.be.equal('Article found');
      });
    done();
  });
  it('should not be able to view specific if not found', (done) => {
    chai.request(app)
      .get('/api/v2/red-flag/10')
      .set('token', userToken)
      .end((err, res) => {
        res.body.status.should.be.equal(404);
        res.body.error.should.be.equal('Incident not found');
      });
    done();
  });
});
