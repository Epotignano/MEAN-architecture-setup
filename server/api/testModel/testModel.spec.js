/**
 * Created by emiliano on 14/07/15.
 */
var assert = require("chai").assert;
var superagent = require("superagent");
var testModel = require('./testModel.model.js');

var testModelBaseUrl = 'http://localhost:9000/test';

var ElementId;

describe("testModel REST API", function() {

    it('should post an element', function(done) {
        superagent.post(testModelBaseUrl)
            .send({
                "title":"Emiliano test",
                "description": "Hola"
            })
            .end(function(error, res) {
                assert.equal(res.body.message, 'saved');
                done();
            })

    });

    it('should get a list of testElements', function(done) {
    superagent.get(testModelBaseUrl)
        .end(function(error, res) {
            assert.isArray(res.body, 'The response is an array');
            res.body.forEach(function(element) {
                //Doing this way, we don't need to touch nothing when the Schema change
                testModel.schema.eachPath(function(path) {
                    assert.isDefined(element[path])
                })
            });

            ElementId = res.body[0]._id;

            done();
        })
    });

   it('should remove a element of the list', function(done) {
        superagent.del(testModelBaseUrl + '/' + ElementId)
            .end(function(failures, res) {
                assert.equal(res.body._id, ElementId);
                assert.equal(res.body.message, "Removed");
                done();
            })
    })

});
