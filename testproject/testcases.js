var request = require('request')
, express = require('express')
,assert = require("assert")
,http = require("http");

describe('http tests', function(){

	it('should return the homepage if the url is correct', function(done){
		http.get('http://localhost:3000/', function(res) {
			assert.equal(200, res.statusCode);
			done();
		})
	});
	
	it('testing with correct credentials', function(done){
		request.post('http://localhost:3000/checksignin',
				{form:{username:'sree.23@gmail.com',password:'sree'}}, function(error,response,body) {
			assert.equal(200, response.statusCode);
			done();
		})
	});
	
	it('testing signup url', function(done){
		request.post('http://localhost:3000/userregistration',
				{form:{firstname:'deepu',lastname:'Medarametla',password:"deepu",email:"deepu.23@gmail.com"}}, function(error,response,body) {
			assert.equal(200, response.statusCode);
			done();
		})
	});
	
	it('will go to following page', function(done){
		request.get('http://localhost:3000/loadhomepage', function(error,response,body) {
			assert.equal(200, response.statusCode);
			done();
		})
	});
	it('will go to following page', function(done){
		request.get('http://localhost:3000/retrieveOrders', function(error,response,body) {
			assert.equal(200, response.statusCode);
			done();
		})
	});
	
});