import joi from '@hapi/joi';

const validation = (user) => {
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

  return Schema.validate(user);
};
export default validation;
