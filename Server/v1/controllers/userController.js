import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import users from '../models/users';
import userValidation from '../helpers/validation';

dotenv.config();
class userController {
  static signup(req, res) {
    const {
      firstName,
      lastName,
      email,
      password,
      gender,
      phoneNumber,
      username,
      userType,
    } = req.body;
    const checkUser = users.find(u => u.email === email);
    if (checkUser) {
      return res.status(401).json({
        status: 401,
        error: 'Email already exist',
      });
    }
    const idNo = users.length + 1;
    const jstoken = jwt.sign({ id: idNo, email, userType }, process.env.SECRET_KEY);
    const hashedPsw = bcrypt.hashSync(password, 10);
    const newUser = userValidation.validate({
      // eslint-disable-next-line max-len
      token: jstoken, id: idNo, firstName, lastName, email, password: hashedPsw, gender, phoneNumber, username, userType,
    });
    if (!newUser.error) {
      users.push(newUser.value);
      return res.status(201).json({
        status: 201,
        message: 'User created successfully',
        token: jstoken,
        data: {
          id: idNo, firstName, lastName, email, gender, phoneNumber, username, userType,
        },
      });
    }
    const validationError = newUser.error.details[0].message.replace('"', ' ').replace('"', '');
    return res.status(400).json({
      status: 400,
      error: validationError,
    });
  }
}
export default userController;
