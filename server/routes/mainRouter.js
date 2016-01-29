var Path = require('path');
var express = require('express');
var sass = require('node-sass-endpoint');
var browserify  = require('browserify-middleware');
var ngAnnotate  = require('browserify-ngannotate');

//routers
var router = express.Router();
var apiRouter = express.Router();

var usersRouter = require('./usersRouter');
var propertiesRouter = require('./propertiesRouter');
var jobsRouter = require('./jobsRouter');

var assetFolder = Path.resolve(__dirname, '../../client/');

router.use(express.static(assetFolder));

var sharedAngular = [
  'angular',
  'angular-animate',
  'angular-cookies',
  'angular-mocks',
  'angular-messages',
  'angular-resource',
  'angular-sanitize',
  'angular-touch',
  'angular-ui-router',
  'angular-ui-router-anim-in-out',
  'jquery'
];



// Set up routing for our api
router.use('/api', apiRouter);

// Set up our different api endpoints
apiRouter.use('/users', usersRouter);
apiRouter.use('/properties', propertiesRouter);
apiRouter.use('/jobs', jobsRouter);


// browserify.settings({ external: ['angular', 'jquery'] });
browserify.settings({
  ignoreMissing: true,
  external: [
    'jquery',
    'angular',
  ],
  noParse: [
    'jquery',
    'angular',
  ]
});

// Serve Angular and Angular modules
router.get('/js/angular.js', browserify(sharedAngular));
// Serve application js files
router.get('/js/app.js', browserify('./client/app.js', { transform: ngAnnotate }));

router.get('/favicon.ico',function(req,res){
  res.send(200)
});


//Serving Sass Files
router.get(
    '/main.css',
    sass.serve('./client/sass/main.scss', {

      // (dev only) defaults to parent folder of scss file.
      // Any sass file changes in this directory will clear the output cache.
      watchDir: './client/sass/',

      // defaults to parent folder of scss file
      includePaths: ['./client/sass/'],

      // defaults to false
      debug: false
    })
  );

// Basically, if we get to this point, serve our Angular app and let Angular deal with routing
router.get('/*', function (req, res) {
  res.sendFile(assetFolder + '/index.html');
});

module.exports = router; 

