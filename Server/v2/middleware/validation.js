import joi from '@hapi/joi';

class validation {
  static userSignup(req, res, next) {
    const Schema = joi.object({
      firstname: joi.string().min(3).required(),
      lastname: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().required(),
      gender: joi.string().valid('male', 'female').required(),
      phonenumber: joi.string().min(10).max(10).required(),
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

  static incidentVal(req, res, next) {
    const Schema = joi.object({
      title: joi.string().required(),
      body: joi.string().required(),
      type: joi.string().valid('Red flag', 'Intervention').required(),
      location: joi.string().required(),
      status: joi.string().valid('draft', 'under investigation', 'resolved').required(),
      images: joi.string().required(),
      videos: joi.string().required(),
      comment: joi.string().required(),
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

  static locationVal(req, res, next) {
    const Schema = joi.object({
      location: joi.string().min(4).required(),
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

  static commentVal(req, res, next) {
    const Schema = joi.object({
      comment: joi.string().min(5).required(),
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
