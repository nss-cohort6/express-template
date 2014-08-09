/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect;
var Person    = require('../../app/models/person');
var dbConnect = require('../../app/lib/mongodb');
var cp        = require('child_process');
var db        = 'template-test';

describe('Person', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      console.log(err, stdout, stderr);
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Person object', function(){
      var p = new Person();
      expect(p).to.be.instanceof(Person);
    });
  });

  describe('.all', function(){
    it('should get all people', function(done){
      Person.all(function(err, people){
        expect(people).to.have.length(2);
        done();
      });
    });
  });
});

