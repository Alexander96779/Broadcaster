import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class Auth {
  static genererateToken(userid, type) {
    return jwt.sign({ userid, type }, process.env.SECRET_KEY);
  }

  static hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  }

  static comparePassword(Ppassword, hashedPassword) {
    return bcrypt.compareSync(Ppassword, hashedPassword);
  }
}
export default Auth;
