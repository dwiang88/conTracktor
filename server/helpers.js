var Admin = require('./lib/models/admin.js');
var Worker = require('./lib/models/workers.js');
var Job = require('./lib/models/jobs.js');
var Propertie = require('./lib/models/properties.js');

var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));

//TOBE ERASED, JUST TESTING************
var toyData = require('./toyData/toyData.js');
// console.log('this is toyData: ', toyData);
//**************

var helpers = {};

// Admin Helpers
helpers.findAdminByEmail = function(email){
  return Admin.findOne({ 'email': email }, function (err, doc) {
    if (err){ 
      console.log('error finding email',err);
      return err;
    };
    return doc;
  });
};

helpers.adminCreate = function (attrs) {
  console.log('Creating Admin...')
  // Create this object incase attrs contains any extra data we dont want/need
  var adminAttrs = {
    email: attrs.email,
    password: attrs.password,
    first: attrs.first,
    last: attrs.last,
    admin: true
  };
  
  var admin = new Admin(adminAttrs);
  return admin.save(function(err){
    if (err){
      console.log('failed to create new Admin',err);
      return err;
    }
    return admin;
  });
};


//General Helpers
helpers.generateHash = function(password) {
  console.log('Generating Hash...');
  return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
};

helpers.validPassword = function(enteredPassword, passwordHash) {
  console.log('Validating Hashed password...'); 
  return bcrypt.compareSync(enteredPassword, passwordHash);
};

//Properties Helpers

helpers.createPropertie = function (attrs) {
  console.log('Creating Propertie...')
  // Create this object incase attrs contains any extra data we dont want/need
  var propAttrs = {
    name: attrs.name,
    address: attrs.address,
    contacts: attrs.contacts,
    description: attrs.description,
  };

  console.log(attrs);
  
  var propertie = new Propertie(propAttrs);
  return propertie.save(function(err){
    if (err){
      console.log('failed to create new Propertie');
      return err;
    }
    return propertie;
  });
};

//Workers Helpers

helpers.createWorker = function (attrs) {
  console.log('Creating Worker...')
  // Create this object incase attrs contains any extra data we dont want/need
  var workerAttrs = {
    first: attrs.first,
    last: attrs.last,
    email: attrs.email,
    password: attrs.password,
    phone: attrs.phone,
    address: attrs.address,
  };
  
  var worker = new Worker(workerAttrs);
  return worker.save(function(err){
    if (err){
      console.log('failed to create new worker');
      return err;
    }
    return worker;
  });
};


// Jobs Helpers

helpers.createJob = function (attrs) {
  console.log('Creating Job....');
  
  var jobAttrs = {
    worker : attrs.worker,
    propertie : attrs.propertie,
    unit : attrs.unit,
    description : attrs.description,
    date_assigned : attrs.date_assigned,
    date_completed : attrs.date_completed,
    status : attrs.status,
    price : attrs.price,
    poNumber : attrs.poNumber,
    invoiceNumber : attrs.invoiceNumber,
    notes : attrs.notes,
    quote : attrs.quote,
  };

  
  var job = new Job(jobAttrs);
    return job.save(function(err){
      if (err){
        console.log('failed to create new job');
        return err;
      }
      return job;
  });

};


module.exports = helpers;
