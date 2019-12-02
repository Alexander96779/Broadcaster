import conn from '../config/databaseConfig';
import auth from '../helpers/authanticate';
import userQuery from '../models/userQuery';

class userController {
  static async signup(req, res) {
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
      const jstoken = auth.genererateToken(saved.rows[0].userid, saved.rows[0].type);
      return res.status(201).json({
        status: 201,
        message: 'User created successfully!',
        data: saved.rows[0],
        token: jstoken,
      });
    }
    return res.status(409).json({
      status: 409,
      error: 'Email already exists!',
    });
  }

  static async signin(req, res) {
    const { email,
      password,
    } = req.body;
    const checkUser = await conn.query(userQuery.findEmail, [email]);
    const show = await conn.query(userQuery.findDisplay, [email]);
    if (checkUser.rowCount > 0) {
      const comparePsw = auth.comparePassword(password, checkUser.rows[0].password);
      const jstoken = auth.genererateToken(checkUser.rows[0].userid, checkUser.rows[0].type);
      if (comparePsw) {
        return res.status(200).json({
          status: 200,
          message: 'User is successfully signed in',
          token: jstoken,
          data: show.rows[0],
        });
      }
      return res.status(400).json({
        status: 400,
        error: 'Wrong email or password',
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'User not found, create account first',
    });
  }
}
export default userController;
