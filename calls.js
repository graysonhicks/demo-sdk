//
// Example Calls
//
// Your structure may differ as needed, but these two basic patterns should cover most scenarios

// Sample data
var userId = "12345";
var userData = {
	example: "value",
	test: "property"
};

// CREATE
var user = new API.Users();
user
	.create(userData)
	.done(function(res) {
		console.log(res, "User created!");
	})
	.fail(function(err) {
		console.log(err);
	});

// GET
var user = new API.Users();
user
	.get(userData)
	.done(function(res) {
		console.log(res, "Users received!");
	})
	.fail(function(err) {
		console.log(err);
	});

// GET INDIVIDUAL
var user = new API.Users();
user
	.getIndividual(userId, userData)
	.done(function(res) {
		console.log(res, "User received!");
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

// DELETE
var user = new API.Users();
user
	.delete(userData)
	.done(function(res) {
		console.log(res, "User deleted!");
	})
	.fail(function(err) {
		console.log(err);
	});
