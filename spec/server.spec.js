'use strict';

var http = require('http');

describe('Server should respond to', function() {
    it('/', function(done) {
        http.get('http://localhost:5000/', function(response) {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});
