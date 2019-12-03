import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
chai.should();

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

describe('Incident tests', () => {
  // ========== CREATE INCIDENT TESTS ===============
  it('should be able to create incident if user', (done) => {
    chai.request(app)
      .post('/api/v2/incident')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjIsInR5cGUiOiJVc2VyIiwiaWF0IjoxNTc1NDA1MDk2fQ.f1UpQJyWRYTMANkCdWtOE_ENgbOpYwg787Dijt_lRb0')
      .send(incident1)
      .end((err, res) => {
        res.body.status.should.be.equal(201);
      });
    done();
  });
  it('should not be able to create incident if not user', (done) => {
    chai.request(app)
      .post('/api/v2/incident')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsInR5cGUiOiJBZG1pbiIsImlhdCI6MTU3NTQwNzEyMX0.1yVOI21sgKXJwvJp3F2OiXaePOrMUm6NellrYLYAS1o')
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
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjIsInR5cGUiOiJVc2VyIiwiaWF0IjoxNTc1NDA1MDk2fQ.f1UpQJyWRYTMANkCdWtOE_ENgbOpYwg787Dijt_lRb0')
      .send(incident2)
      .end((err, res) => {
        res.body.status.should.be.equal(400);
      });
    done();
  });
});
