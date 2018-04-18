import Joi from 'joi';

export default {
  // POST /api/login
  loginTask: {
    params: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  },
};