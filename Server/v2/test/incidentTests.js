import Chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import auth from '../helpers/authanticate';

Chai.use(chaiHttp);
Chai.should();

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
const adminToken = auth.genererateToken(20, user2);

describe('Incident tests', () => {
  // ========== CREATE INCIDENT TESTS ===============
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
  it('should not be able to create incident if not user', (done) => {
    Chai.request(app)
      .post('/api/v2/incident')
      .set('token', adminToken)
      .send(incident1)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property(
          'error',
          'Only users are allowed to create incidents',
        );
        done();
      });
  });
  it('should not be able to create incident, if validation errors', (done) => {
    Chai.request(app)
      .post('/api/v2/incident')
      .set('token', userToken)
      .send(incident2)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error');
        done();
      });
  });
  // =========== VIEW ALL TESTS ============
  it('should be able to view all records if admin', (done) => {
    Chai.request(app)
      .get('/api/v2/red-flags')
      .set('token', adminToken)
      .end((err, res) => {
        res.should.have.status(200);
      });
    done();
  });
  it('should not be able to view all if not admin', (done) => {
    Chai.request(app)
      .get('/api/v2/red-flags')
      .set('token', userToken)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('error', 'Unauthorized access');
      });
    done();
  });
  // ======== VIEW SPECIFIC TESTS ==============
  it('should be able to view specific incident if created by', (done) => {
    Chai.request(app)
      .get(`/api/v2/red-flag/${1}`)
      .set('token', `${userToken}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message', 'Incident found');
        res.body.data.should.have.property('incidentid', 1);
        res.body.data.should.have.property('title', 'Job Corruption');
        res.body.data.should.have.property('type', 'Red flag');
        done();
      });
  });
  it('should not be able to view specific if not found', (done) => {
    Chai.request(app)
      .get(`/api/v2/red-flag/${20}`)
      .set('token', `${userToken}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('error', 'Incident not found');
        done();
      });
  });
  it('should not be able to view specific if not created by', (done) => {
    Chai.request(app)
      .get(`/api/v2/red-flag/${1}`)
      .set('token', adminToken)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('error', 'Unauthorized access');
        done();
      });
  });
  // ============ UPDATE LOCATION TESTS ========
  it('should be able to update location if created by', (done) => {
    Chai.request(app)
      .patch('/api/v2/red-flag/Location/1')
      .set('token', userToken)
      .send({ location: 'Rubavu' })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message', 'Location well updated');
        done();
      });
  });
  it('should not be able to update location if missing info', (done) => {
    Chai.request(app)
      .patch('/api/v2/red-flag/Location/1')
      .set('token', userToken)
      .send()
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error');
        done();
      });
  });
  it('should not be able to update location if not created by', (done) => {
    Chai.request(app)
      .patch('/api/v2/red-flag/Location/1')
      .set('token', adminToken)
      .send({ location: 'Rubavu' })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('error', 'Unauthorized access');
        done();
      });
  });
  it('should not be able to update location if not found', (done) => {
    Chai.request(app)
      .patch('/api/v2/red-flag/Location/10')
      .set('token', userToken)
      .send({ location: 'Rubavu' })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('error', 'Incident not found');
        done();
      });
  });
  // ============ UPDATE COMMENT TESTS ========
  it('should be able to update comment if created by', (done) => {
    Chai.request(app)
      .patch('/api/v2/red-flag/Comment/1')
      .set('token', userToken)
      .send({ comment: 'Thanks yay' })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message', 'Comment well updated');
        done();
      });
  });
  it('should not be able to update comment if missing info', (done) => {
    Chai.request(app)
      .patch('/api/v2/red-flag/Comment/1')
      .set('token', userToken)
      .send()
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error');
        done();
      });
  });
  it('should not be able to update comment if not created by', (done) => {
    Chai.request(app)
      .patch('/api/v2/red-flag/Comment/1')
      .set('token', adminToken)
      .send({ comment: 'Thanks yay' })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('error', 'Unauthorized access');
        done();
      });
  });
  it('should not be able to update comment if not found', (done) => {
    Chai.request(app)
      .patch('/api/v2/red-flag/Comment/10')
      .set('token', userToken)
      .send({ comment: 'Thanks yay' })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('error', 'Incident not found');
        done();
      });
  });
  // =========== DELETE INCIDENT TESTS ==========
  it('should not be able to delete if not created by', (done) => {
    Chai.request(app)
      .delete(`/api/v2/red-flag/Delete/${1}`)
      .set('token', adminToken)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('error', 'Unauthorized access');
        done();
      });
  });
  it('should be able to delete if created by', (done) => {
    Chai.request(app)
      .delete(`/api/v2/red-flag/Delete/${1}`)
      .set('token', userToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message', 'Incident well deleted');
        done();
      });
  });
  it('should not be able to delete if not found', (done) => {
    Chai.request(app)
      .delete('/api/v2/red-flag/Delete/20')
      .set('token', userToken)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.have.property('error', 'Incident not found');
        done();
      });
  });
});
