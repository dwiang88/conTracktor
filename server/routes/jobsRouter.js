var express = require('express');
var router = express.Router();

var auth = require('../auth.js');
//Uses DB config and Schema
var db = require('../lib/db.js');
var Properties = require('../lib/models/properties.js');
var Jobs = require('../lib/models/jobs.js');
var Workers = require('../lib/models/workers.js');
var helpers = require('../helpers.js');


// Get all projects for a user
router.get('/', auth.requireAuth, function (req, res) {
  Jobs.find({}, function (err, doc) {
    if (err){ 
      console.log('error getting Jobs',err);
      return err;
    };
    return doc;
  })
  .then(function(jobs){
    res.status(200).json(jobs);
  })
  .catch(function(err){
    res.status(401).json({'error':true});
  });
});

router.get('/:jobId', auth.requireAuth, function (req, res) {
  Jobs.findOne({'_id':req.params.jobId}, function(err,doc){
    if(err){
      console.log('error getting Job',err);
      return err;
    }
    return doc;
  })
  .then(function(job){
    res.status(200).json(job);
  })
  .catch(function(err){
    res.status(401).json({'error':true});
  })

});

router.post('/', auth.requireAuth, function (req, res) {
  
  var newJob = req.body;
  //TODO FIND A WAY TO ASSING THE ID'S OF PROPERTIE AND WORKER WHEN CREATING THE JOB THIS WILL PROABLY WILL BE HANDLED BY THE CLIENT

  helpers.createJob({newJob})
  .then(function(worker){
    res.status(201).json(job); 
  })
  .catch(function(err){
    console.log('Error Creating job...', err)
    res.status(401).json({'error':true})
  }) 

});

router.put('/:jobId', auth.requireAuth, function (req, res) {
  
  Jobs.findByIdAndUpdate( { '_id' : req.params.jobId }, { $set : req.body }, function(err, doc) {
    if (err) { 
      console.log('Jobs PUT ERR', err); 
      res.status(401).json({'error':true});
    };
    res.status(200).json(doc);
  }); 

});

router.delete('/:jobId', auth.requireAuth, function (req, res) {
  
  Jobs.remove( { '_id' : req.params.workerId }, function(err, doc) {
    if (err) { 
      console.log('Jobs delete ERR', err); 
      res.status(401).json({'error':true});
    };
    res.status(200).json(doc);
  }); 

});

module.exports = router;
