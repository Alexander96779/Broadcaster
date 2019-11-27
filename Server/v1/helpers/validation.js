
import Joi from '@hapi/joi';

const userSchema = Joi.object().keys({
  id: Joi.number().required(),
  token: [Joi.string(), Joi.number().required()],
  firstName: Joi.string().regex(/^[a-zA-Z]{3,30}$/).min(3).max(30).required(),
  lastName: Joi.string().regex(/^[a-zA-Z]{3,30}$/).min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(100).required(),
  phoneNumber: Joi.string().alphanum().min(10).max(10).required(),
  username: Joi.string().regex(/^[a-zA-Z ]{3,30}$/).min(3).max(30).required(),
  gender: Joi.string().valid('female', 'male').required(),
  userType: Joi.string().valid('user', 'admin').required(),
});

export default userSchema;
