'use strict';

import express from 'express';

const chai = require('chai');  
const expect = require('chai').expect;

chai.use(require('chai-http'));

// define our app using express
const app = express();

describe('Testing API endpoints', function() {
  var token;
  this.timeout(10000);
  //  Return a token
  it('should return a token response to username and password', function() {
  	return chai.request('http://localhost:3001')
  	.post('/api/login')
  	.type('form')
  	.send({
      'username': 'stackabuse',
      'password': 'abc123'
    })
  	.then(function(res) {
      var json = JSON.parse(res.text),
      status;
      
      token = json.token;
      status = json.success;

      expect(res).to.have.status(200);
      expect(token).to.be.a('string');
      expect(status).be.true;

    });
  });

  it('should not return token if password field is empty', function() {
    return chai.request('http://localhost:3001')
    .post('/api/login')
    .type('form')
    .send({
     'username': 'stackabuse',
     'password': ''
   })
    .then(function(res) {
      expect(res).to.have.status(400);
      
    });
  });

  it('should not return token if username field is empty', function() {
    return chai.request('http://localhost:3001')
    .post('/api/login')
    .type('form')
    .send({
     'username': '',
     'password': 'abc123'
   })
    .then(function(res) {
      expect(res).to.have.status(400);
      
    });
  });

  it('should return a patched json object', function() {
    return chai.request('http://localhost:3001')
    .post('/api/patch-object')
    .set('Content-Type','application/json')
    .send({
      "payload" : {
        "key1" : "dreese"
      },
      "patchMe" : [ 
      {
        "op": "add", 
        "path": "/key2", 
        "value": "Ginger Nut"
      }
      ],
      "token" : token
    })
    .then(function(res) {

      var json = JSON.parse(res.text);
      expect(res).to.have.status(200);
      expect(json.key2).to.equal("Ginger Nut");

    });
  });

  it('should not return a patched json object without a token', function() {
    return chai.request('http://localhost:3001')
    .post('/api/patch-object')
    .set('Content-Type','application/json')
    .send({
      "payload" : {
        "key1" : "dreese"
      },
      "patchMe" : [ 
      {
        "op": "add", 
        "path": "/key2", 
        "value": "Ginger Nut"
      }
      ]
    })
    .then(function(res) {      
      var json = JSON.parse(res.text);
      expect(res).to.have.status(403);
      expect(json.success).be.false;

    });
  });

  it('should return an image with token provided', function() {
    return chai.request('http://localhost:3001')
    .post('/api/resizeImage')
    .set('Content-Type','application/json')
    .send({
      "token" : token
    })
    .then(function(res) {      
      expect(res).to.have.status(200);
    });
  });

  //Protected route
  it('should not return an image without a token provided', function() {
    return chai.request('http://localhost:3001')
    .post('/api/resizeImage')
    .set('Content-Type','application/json')
    .send({})
    .then(function(res) {  
      expect(res).to.have.status(403);
    });
  });

  //Protected image route
  it('should not return an image with a bad token provided', function() {
    return chai.request('http://localhost:3001')
    .post('/api/resizeImage')
    .set('Content-Type','application/json')
    .send({
      "token" : "fake"
    })
    .then(function(res) {
      var json = JSON.parse(res.text);
      expect(json.success).be.false;
      expect(json.message).to.equal("Failed to authenticate token.");
    });
  });

});

