import joi from '@hapi/joi';

class validation {
  static userSignup(req, res, next) {
    const Schema = joi.object({
      firstname: joi.string().required(),
      lastname: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().required(),
      gender: joi.string().valid('male', 'female').required(),
      phonenumber: joi.string().required(),
      username: joi.string().required(),
      type: joi.string().valid('User', 'Admin').required(),
    });

    const { error } = Schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message.replace(/"/g, ''),
      });
    }
    next();
  }

  static userSignin(req, res, next) {
    const Schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().required(),
    });
    const { error } = Schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message.replace(/"/g, ''),
      });
    }
    next();
  }
}
export default validation;
