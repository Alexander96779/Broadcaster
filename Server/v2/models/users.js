import auth from '../helpers/authanticate';

const users = req => {
  const user = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: auth.hashPassword(req.body.password),
    gender: req.body.gender,
    phonenumber: req.body.phonenumber,
    username: req.body.username,
    type: req.body.type,
  };
  return user;
};

export default users;
