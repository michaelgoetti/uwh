
var express = require('express'),
    bodyParser = require('body-parser'),
    nunjucks = require('nunjucks'),
    nav = require('./data/nav.json');


// Set up express
app = express();
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use('/static', express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({ extended: true }));


/*
 Configure nunjucks to work with express
 See: https://github.com/tj/consolidate.js/pull/224
*/
var env = nunjucks.configure('views', {
    autoescape: true,
    express: app
});

var nunjucksDate = require('nunjucks-date');
nunjucksDate.setDefaultFormat('MMMM Do YYYY, h:mm:ss a');
env.addFilter("date", nunjucksDate);

    var router = express.Router();

    // Homepage
    router.get("/", function(req, res) {
        "use strict";


      res.render('home', { topnav: nav.topnav,
                           bottomnav: nav.bottomnav
                         });

      });

    // Use the router routes in our application
    app.use('/', router);
    var port = process.env.PORT || 5000;

    // Start the server listening
    var server = app.listen(port, function() {
        var port = server.address().port;
        console.log('UWHCopy server listening on port %s.', port);
    });
