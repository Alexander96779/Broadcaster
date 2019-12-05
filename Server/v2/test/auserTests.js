import Chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

Chai.use(chaiHttp);
Chai.should();

const user = {
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

describe('User sign up test', () => {
  // ============= SIGN UP TESTS ======
  it('should be able to sign up', done => {
    Chai.request(app)
      .post('/api/v2/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('message', 'User created successfully!');
        res.body.should.have.property('token');
        res.body.data.should.have.property('firstname', 'Nyampinga');
        res.body.data.should.have.property('lastname', 'Espe');
        res.body.data.should.have.property('email', 'nyaespe@gmail.com');
        done();
      });
  });
  it('should not be able to sign up if email exists', done => {
    Chai.request(app)
      .post('/api/v2/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.have.property('error', 'Email already exists!');
        done();
      });
  });
  it('should not be able to sign up if there are validation errors', done => {
    Chai.request(app)
      .post('/api/v2/signup')
      .send(user2)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error');
        done();
      });
  });
  // ================= SIGN IN TESTS =======
  it('should be able to sign in, if has an account', done => {
    Chai.request(app)
      .post('/api/v2/signin')
      .send({ email: user.email, password: user.password })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message', 'User is successfully signed in');
        res.body.should.have.property('token');
        res.body.data.should.have.property('firstname', 'Nyampinga');
        res.body.data.should.have.property('lastname', 'Espe');
        res.body.data.should.have.property('gender', 'female');
        done();
      });
  });
  it('should not be able to sign in if wrong email or password', done => {
    Chai.request(app)
      .post('/api/v2/signin')
      .send({ email: user.email, password: 'sdvdsgjk' })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error', 'Wrong email or password');
        done();
      });
  });
  it('should not be able to sign in if does not have an account', done => {
    Chai.request(app)
      .post('/api/v2/signin')
      .send({ email: user2.email, password: user2.password })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('error', 'User not found, create account first');
        done();
      });
  });
  it('should not be able to sign in if validation errors', done => {
    Chai.request(app)
      .post('/api/v2/signin')
      .send({ email: user.email })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error');
        done();
      });
  });
});
