/**
*   Demo SDK
*/
// IIFE to define and return API object
var API = (function(self) {
	// ajax object to hold native Deferred and $.ajax methods for use below
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

	$ajax.get = function(url, params) {
		var $d = $.Deferred();
		$.get(url, params)
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

	$ajax.delete = function(url, params) {
		// Test if params are object or array for setting _METHOD
		if (typeof params !== "object") {
			params = { _METHOD: "DELETE" };
		} else {
			params["_METHOD"] = "DELETE";
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
	self.Users.prototype.get = function(params) {
		return $ajax.post("/api/route/exampleUsers/", params);
	};
	// Notice function receiving userId as argument and concatenating to url
	self.Users.prototype.getIndividual = function(exampleUserId, params) {
		return $ajax.post("/api/route/exampleUsers/" + exampleUserId, params);
	};
	self.Users.prototype.update = function(exampleUserId, params) {
		return $ajax.put("/api/route/exampleUsers/" + exampleUserId, params);
	};
	self.Users.prototype.delete = function(params) {
		return $ajax.delete("/api/route/exampleUsers/", params);
	};

	return self;
})(API || {});
