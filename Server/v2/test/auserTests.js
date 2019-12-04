import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
chai.should();
const user1 = {
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
        res.body.status.should.be.equal(409);
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
  // =================== SIGN IN TESTS ============
  it('should be able to sign in If has an account', (done) => {
    chai.request(app)
      .post('/api/v2/signin')
      .send({ email: user1.email, password: user1.password })
      .end((err, res) => {
        res.body.status.should.be.equal(200);
        res.body.message.should.be.equal('User is successfully signed in');
      });
    done();
  });
  it('should not be able to sign in if wrong email or password', (done) => {
    chai.request(app)
      .post('/api/v2/signin')
      .send({ email: user1.email, password: 'shvsdhjds' })
      .end((err, res) => {
        res.body.status.should.be.equal(400);
        res.body.error.should.be.equal('Wrong email or password');
      });
    done();
  });
  it('should not be able to sign in if account does not exist', (done) => {
    chai.request(app)
      .post('/api/v2/signin')
      .send({ email: user2.email, password: user2.password })
      .end((err, res) => {
        res.body.status.should.be.equal(404);
        res.body.error.should.be.equal('User not found, create account first');
      });
    done();
  });
  it('should not be able to sign in if validation errors', (done) => {
    chai.request(app)
      .post('/api/v2/signin')
      .send({ password: user1.password })
      .end((err, res) => {
        res.body.status.should.be.equal(400);
      });
    done();
  });
});
