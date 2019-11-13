import Joi from '@hapi/joi';

const entrySchema = Joi.object().keys({
  entryId: Joi.number().required(),
  createdOn: Joi.date().required(),
  createdBy: Joi.number().required(),
  title: Joi.string().required(),
  type: Joi.string().valid('Redflag', 'Intervention').required(),
  location: Joi.string().required(),
  status: Joi.string().valid('draft').required(),
  image: Joi.array(),
  video: Joi.array(),

});

export default entrySchema;
