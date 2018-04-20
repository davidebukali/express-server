// ./express-server/routes/todo.server.route.js
import express from 'express';
import validate from 'express-validation';
import validations from './validation/tasks';

//import controller file
import * as serverController from '../controllers/server.controller';

import jwt from 'jsonwebtoken'

// get an instance of express router
const router = express.Router();

// define our app using express
const app = express();

router.route('/login')
.post(validate(validations.loginTask), serverController.loginUser);

router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, 'murderInc', function(err, decoded) {      
    	if (err) {
    		return res.json({ success: false, message: 'Failed to authenticate token.' });
    	} else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded; 
        next();
    }
    
});

} else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
    	success: false, 
    	message: 'No token provided.' 
    });

}
});

router.route('/patch-object')
.post(validate(validations.patchTask), serverController.patchJson);

const imgURL = "https://dummyimage.com/300/09f/fff.png";
var Jimp = require("jimp")
var fs = require('fs'),
request = require('request');

var download = function(uri, filename, callback){
	request.head(uri, function(err, res, body){
		request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
	});
};

router.route('/resizeImage')
.post((req, res) => {
	Jimp.read(imgURL, function(err,img){
		if (err) throw err;
        img.resize(32, 32).write("lena-small-bw.png"); // save
        res.download(__basedir+'/lena-small-bw.png');
    });
});

export default router;