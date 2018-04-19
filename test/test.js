'use strict';

import express from 'express';

const chai = require('chai');  
const expect = require('chai').expect;

chai.use(require('chai-http'));

// define our app using express
const app = express();

describe('Testing API endpoints', function() {

  this.timeout(5000); // How long to wait for a response (ms)

  before(function() {

  });

  after(function() {

  });

  // GET - List all colors
  it('should return a token', function() {
  	return chai.request('localhost:3001')
  	.post('/api/login')
  	.type('form')
  	.send({username: 'stackabuse', passsword: 'abc123'})
  	.then(function(res, err) {
  		console.log(JSON.stringify(res))
  		expect(res).to.have.status(200);
  		expect(res).to.be.json;
  		// expect(res.body).to.be.an('object');
  		// expect(res.body.results).to.be.an('array');
  	}).catch(function (err) {
  		throw err;
  	});
  });

});