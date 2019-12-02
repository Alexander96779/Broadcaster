import chai from 'chai';
import chaiHttp from 'chai-http';
import uuid from 'uuid/v1';
import app from '../../app';

chai.use(chaiHttp);
chai.should();
const user1 = {
  userid: uuid(),
  firstname: 'Nyampinga',
  lastname: 'Espe',
  email: 'nyaespe@gmail.com',
  password: 'espe123',
  gender: 'female',
  phonenumber: '0722117477',
  username: 'Espe',
  type: 'User',
};

const user2 = {
  firstname: 'Nyampinga',
  lastname: 'Esperance',
  email: 'espe@gmail.com',
  password: 'espe123',
  gender: 'female',
  username: 'Espe',
  type: 'User',
};

describe('User tests', () => {
  // ========== SIGN UP TESTS ===============
  it('should be able to sign up user', (done) => {
    chai.request(app)
      .post('/api/v2/signup')
      .send(user1)
      .end((err, res) => {
        res.body.status.should.be.equal(201);
        res.body.message.should.be.equal('User created successfully!');
      });
    done();
  });
  it('should not be able to sign up if email exists', (done) => {
    chai.request(app)
      .post('/api/v2/signup')
      .send(user1)
      .end((err, res) => {
        res.body.status.should.be.equal(401);
        res.body.error.should.be.equal('Email already exists!');
      });
    done();
  });
  it('should not be able to sign up if there are missing info', (done) => {
    chai.request(app)
      .post('/api/v2/signup')
      .send(user2)
      .end((err, res) => {
        res.body.status.should.be.equal(400);
      });
    done();
  });
});
