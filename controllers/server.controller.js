// ./express-server/controllers/todo.server.controller.js
import mongoose from 'mongoose';
import * as token from '../libs/auth';
import jsonpatch from 'fast-json-patch'

export const loginUser = (req,res) => {

  let { username, password } = req.body

  res.status(200)
  .json({
    success: true,
    token: token.createJWToken({
      sessionData: {
        name: username,
        pass: password
      },
      maxAge: 3600
    })
  })
}

export const patchJson = (req,res) => {
  let { payload, patchMe } = req.body;
  payload = jsonpatch.applyPatch(payload, patchMe).newDocument;
  res.send(JSON.stringify(payload));
}