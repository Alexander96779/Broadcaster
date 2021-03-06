import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import users from '../models/users';
import userValidation from '../helpers/validation';

dotenv.config();
class userController {
  static welcome(req, res) {
    return res.status(200).json({
      status: 200,
      message: ' Broadcaster enables any/every citizen to bring any form of corruption to the notice of appropriate authorities and the general public. Users can also report on things that need government intervention',
    });
  }

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
    const checkUser = users.find((u) => u.email === email);
    if (checkUser) {
      return res.status(401).json({
        status: 401,
        error: 'Email already exist',
      });
    }
    const idNo = users.length + 1;
    const jstoken = jwt.sign({ id: idNo, userType }, process.env.SECRET_KEY);
    const hashedPsw = bcrypt.hashSync(password, 10);
    const newUser = userValidation.validate({
      token: jstoken, id: idNo, firstName, lastName, email, password: hashedPsw, gender, phoneNumber, username, userType,
    });
    if (!newUser.error) {
      users.push(newUser.value);
      return res.status(201).json({
        status: 201,
        message: 'User created successfully',
        token: jstoken,
        data: {
          firstName, lastName, email, gender, phoneNumber, username, userType,
        },
      });
    }
    const validationError = newUser.error.details[0].message.replace('"', ' ').replace('"', '');
    return res.status(400).json({
      status: 400,
      error: validationError,
    });
  }

  static signin(req, res) {
    const {
      email, password,
    } = req.body;
    const checkUser = users.find((u) => u.email === email);
    if (!checkUser) {
      return res.status(404).json({
        status: 404,
        error: 'User not found',
      });
    }
    const jstoken = jwt.sign({ id: checkUser.id, userType: checkUser.userType }, process.env.SECRET_KEY, { expiresIn: '1h' });
    const comparePassword = bcrypt.compareSync(password, checkUser.password);
    if (!comparePassword) {
      return res.status(401).json({
        status: 401,
        error: 'Invalid email or password',
      });
    }

    return res.status(200).json({
      status: 200,
      message: 'User successfully signed in',
      token: jstoken,
      data: {
        email: checkUser.email, firstName: checkUser.firstName, lastName: checkUser.lastName,
      },
    });
  }
}
export default userController;
