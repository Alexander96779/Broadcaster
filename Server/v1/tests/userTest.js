/* eslint-disable no-undef */
import Chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

Chai.use(chaiHttp);
Chai.should();

// eslint-disable-next-line no-undef
describe('User test', () => {
  // ===========SIGN UP TESTS==========
  it('should be able to sign up', (done) => {
    const user = {
      firstName: 'Nziyu',
      lastName: 'JeanPaul',
      email: 'nzjeanpaul@gmail.com',
      password: 'jp123',
      gender: 'male',
      phoneNumber: '0789128970',
      username: 'JayP',
      userType: 'user',
    };
    Chai.request(app)
      .post('/api/v1/signup')
      .send(user)
      .end((err, res) => {
        res.body.status.should.be.equal(201);
        res.body.message.should.be.equal('User created successfully');
      });
    done();
  });
  // eslint-disable-next-line no-undef
  it('should be able to check if email exists', (done) => {
    const user = {
      firstName: 'Nziyu',
      lastName: 'JeanPaul',
      email: 'espe12@gmail.com',
      password: 'jp123',
      gender: 'male',
      phoneNumber: '0789128970',
      username: 'John Paul',
      userType: 'user',
    };
    Chai.request(app)
      .post('/api/v1/signup')
      .send(user)
      .end((err, res) => {
        res.body.status.should.be.equal(401);
        res.body.error.should.be.equal('Email already exist');
      });
    done();
  });
  // eslint-disable-next-line no-undef
  it('should not be able to sign up for missing info', (done) => {
    const user = {
      lastName: 'Jean Paul',
      email: 'nziyujeanpaul@gmail.com',
      password: 'jp123',
      gender: 'male',
      phoneNumber: '0789128970',
      username: 'John Paul',
      userType: 'user',
    };
    Chai.request(app)
      .post('/api/v1/signup')
      .send(user)
      .end((err, res) => {
        res.body.status.should.be.equal(400);
      });
    done();
  });
  //   ===========SIGN IN TESTS==========
  it('should be able to sign in', (done) => {
    const user = {
      email: 'espe12@gmail.com',
      password: 'espe123',
    };
    Chai.request(app)
      .post('/api/v1/signin')
      .send(user)
      .end((err, res) => {
        res.body.status.should.be.equal(200);
        res.body.should.be.an('object');
        res.body.message.should.be.equal('User successfully signed in');
      });
    done();
  });
  it('should not be able to sign in when not signed up', (done) => {
    const user = {
      email: 'esperance@gmail.com',
      password: 'esperance',
    };
    Chai.request(app)
      .post('/api/v1/signin')
      .send(user)
      .end((err, res) => {
        res.body.status.should.be.equal(404);
        res.body.should.be.an('object');
        res.body.error.should.be.equal('User not found');
      });
    done();
  });
  it('should not be able to sign in if passwords do not match', (done) => {
    const user = {
      email: 'espe12@gmail.com',
      password: 'espe',
    };
    Chai.request(app)
      .post('/api/v1/signin')
      .send(user)
      .end((err, res) => {
        res.body.status.should.be.equal(401);
        res.body.should.be.an('object');
        res.body.error.should.be.equal('Invalid email or password');
      });
    done();
  });
});
