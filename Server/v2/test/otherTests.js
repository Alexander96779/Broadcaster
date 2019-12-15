import Chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import auth from '../helpers/authanticate';

Chai.use(chaiHttp);
Chai.should();

const user1 = 'User';
const user2 = 'Admin';

const userToken = auth.genererateToken(1, user1);
const adminToken = auth.genererateToken(2, user2);

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

describe('Admin Tests', () => {
  it('should be able to create incident if user', (done) => {
    Chai.request(app)
      .post('/api/v2/incident')
      .set('token', userToken)
      .send(incident1)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.data.should.have.property('title', 'Job Corruption');
        res.body.data.should.have.property('type', 'Red flag');
        done();
      });
  });
  //   ============== ADMIN ACCEPT INCIDENT TESTS ==========
  it('should be able to accept if admin', (done) => {
    Chai.request(app)
      .patch('/api/v2/red-flag/Status/2')
      .set('token', adminToken)
      .send({ status: 'under investigation' })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message', 'Incident status changed');
        done();
      });
  });
  it('should not be able to accept if not found', (done) => {
    Chai.request(app)
      .patch('/api/v2/red-flag/Status/11')
      .set('token', adminToken)
      .send({ status: 'under investigation' })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('error', 'Sorry, Incident not found');
        done();
      });
  });
  it('should not be able to accept if not admin', (done) => {
    Chai.request(app)
      .patch('/api/v2/red-flag/Status/1')
      .set('token', userToken)
      .send({ status: 'under investigation' })
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.have.property('error', 'Forbidden route');
        done();
      });
  });
});
