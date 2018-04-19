'use strict';

import express from 'express';

const chai = require('chai');  
const expect = require('chai').expect;

chai.use(require('chai-http'));

// define our app using express
const app = express();

describe('Testing API endpoints', function() {

  //  Return a token
  it('should return a token response to username and password', function() {
  	return chai.request('http://localhost:3001')
  	.post('/api/login')
  	.type('form')
  	.send({
  		 // _method: 'post',
  		'username': 'stackabuse',
  		'password': 'abc123'
  	})
  	.then(function(res) {
  		expect(res).to.have.status(200);
  	});
  });

  // //  Return a token
  // it('should return a token response to username and password', function() {
  // 	return chai.request('http://localhost:3001')
  // 	.post('/api/login')
  // 	.type('form')
  // 	.send({
  // 		 // _method: 'post',
  // 		'username': 'stackabuse',
  // 		'password': 'abc123'
  // 	})
  // 	.then(function(res) {
  // 		expect(res).to.have.status(200);
  // 	});
  // });

});