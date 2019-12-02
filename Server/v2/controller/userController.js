import conn from '../config/databaseConfig';
import auth from '../helpers/authanticate';
import validation from '../helpers/userValidation';
import userQuery from '../models/userQuery';
import users from '../models/users';

class userController {
  static async signup(req, res) {
    const { err } = validation(users(req));

    if (err) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message.replace(/"/g, ''),
      });
    }

    const {
      firstname,
      lastname,
      email,
      gender,
      phonenumber,
      username,
      type,
    } = req.body;
    const password = auth.hashPassword(req.body.password);

    const save = await conn.query(userQuery.createUser, [
      firstname,
      lastname,
      email,
      password,
      gender,
      phonenumber,
      username,
      type,
    ]);
    if (save.rowCount === 1) {
      const saved = await conn.query(userQuery.findOne, [email]);
      return res.status(201).json({
        status: 201,
        message: 'User created successfully!',
        data: saved.rows[0],
        token: auth.genererateToken(
          saved.rows[0].userid,
          saved.rows[0].type,
        ),
      });
    }
    return res.status(401).json({
      status: 401,
      error: 'Email already exists!',
    });
  }
}
export default userController;
