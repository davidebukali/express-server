import Joi from 'joi';

export default {
  // POST /api/login
  loginTask: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  },
  patchTask: {
    body: {
      payload: Joi.object().required()
    }
  }
};