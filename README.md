# A Basic SDK

A simple architecture and pattern for wrapping native $.ajax calls in a custom SDK.

## Usage
For a full blog post on usage and implementation check out my [Medium article](https://github.com/graysonhicks/demo-sdk/blob/master/api.js).

## The API File

The basic pattern for defining and attaching the API calls. Only `.create()` and `.update()` shown here, see [api.js](https://github.com/graysonhicks/demo-sdk/blob/master/api.js) for full CRUD patterns.
```javascript
// IIFE to define and return API object
var API = (function(self) {
	// ajax object to hold native Deferred and $.ajax methods for use below, it is not returned, only available within API
	var $ajax = {};

	$ajax.post = function(url, params) {
		// instantiate Deferred object
		var $d = $.Deferred();
		// use native $.ajax interface
		$.post(url, params)
			.done(function(res) {
				// custom tests for failing the call using Deferred .reject()
				if (!res || res.statusCode == 400) {
					$d.reject(res);
				}
				// if successful
				$d.resolve(res);
			})
			.fail(function(x, h, r) {
				$d.reject(x, h, r);
			});
		return $d;
	};
  
  	$ajax.put = function(url, params) {
		// Test if params are object or array for setting _METHOD
		if (typeof params !== "object") {
			params = { _METHOD: "PUT" };
		} else {
			params["_METHOD"] = "PUT";
		}
		var $d = $.Deferred();
		$.post(url, params)
			.done(function(res) {
				if (!res || res.statusCode == 400) {
					$d.reject(res);
				}
				$d.resolve(res);
			})
			.fail(function(x, h, r) {
				$d.reject(x, h, r);
			});
		return $d;
	};
  
  	//Users
	self.Users = function() {};
	// attach create method to prototype
	// use post method defined above and pass in url and params
	self.Users.prototype.create = function(params) {
		return $ajax.post("/api/route/exampleUsers/", params);
	};

  // Notice function receiving userId as argument and concatenating to url
	self.Users.prototype.update = function(exampleUserId, params) {
		return $ajax.put("/api/route/exampleUsers/" + exampleUserId, params);
	};

	return self;
})(API || {});

```

## The Calls

This is how the above API calls are actually called within your front-end framework of choice. Again, only `.create()` and `.update()` shown here. See [calls.js](https://github.com/graysonhicks/demo-sdk/blob/master/calls.js) for full CRUD usage.

```javascript
// Sample data
var userId = "12345";
var userData = {
	example: "value",
	test: "property"
};

// CREATE
var user = new API.Users();
user
	.create(userData)  // here we call the create function we named in api.js
	.done(function(res) {
		console.log(res, "User created!");
	})
	.fail(function(err) {
		console.log(err);
	});
  
// UPDATE
var user = new API.Users();
user
	.update(userId, userData)
	.done(function(res) {
		console.log(res, "User updated!");
	})
	.fail(function(err) {
		console.log(err);
	});

```
