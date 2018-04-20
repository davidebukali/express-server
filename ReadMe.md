Simple express server
======================

1. After cloning repo to your pc run: 

	**npm install**

    This will install all dependencies


2.	To start server run: 
	
	**npm start**

	App runs at http://localhost:3001/

3.	To run tests: 

	**npm test**

4.	Available routes include:
	
	- http://localhost:3001/api/login

		Unprotected route that accepts a post request with any username and password credentials to return a token. Token is not returned if either parameters is missing or empty. Expects credentials of the format below;

		```javascript
		var loginData = {
			"username" : "max",
			"password" : "abc123"
		}
		```

	- http://localhost:3001/api/patch-object

		Protected route that requires token to apply jsonpatch to an object. Expects data of the general format below;

		```javascript
		var data = {
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
      	  "token" : "fill_in_your_token_here"
	    }
	    
	    ```

	    Above payload will result in the following response;

		```javascript
		var data = {
	      "payload" : {
	        "key1" : "dreese",
	        "key2" : "Ginger Nut"
	      }
	    
	    ```	    

	- http://localhost:3001/api/resizeImage

		Protected route that requires a token and only accepts a post request to download thumbnail image from public api online. Expects data payload below;

		```javascript
			var data = {
		      "token" : "fill_in_your_token_here"
		    }
		```