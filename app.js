
/**
 * Module dependencies
 */

var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  // errorHandler = require('error-handler'),
  morgan = require('morgan'),
  jwt = require('jwt-simple'),
  _ = require('underscore'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path');

var app = module.exports = express();

//mongoDB setup
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/DancingTails');

//load environment variables
var dotenv = require('dotenv');
dotenv.load();

/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('jwtTokenSecret','123456ABCDEF');
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));


var tokens = [];

function requiresAuthentication(request, response, next) {
    console.log(request.headers);
    if (request.headers.access_token) {
        var token = request.headers.access_token;
        if (_.where(tokens, token).length > 0) {
            var decodedToken = jwt.decode(token, app.get('jwtTokenSecret'));
            if (new Date(decodedToken.expires) > new Date()) {
                next();
                return;
            } else {
                removeFromTokens();
                response.end(401, "Your session is expired");
            }
        }
    }
    response.end(401, "No access token found in the request");
}

function removeFromTokens(token) {
    for (var counter = 0; counter < tokens.length; counter++) {
        if (tokens[counter] === token) {
            tokens.splice(counter, 1);
            break;
        }
    }
}
var env = process.env.NODE_ENV || 'development';

// development only
// if (env === 'development') {
//   app.use(express.errorHandler());
// }

// production only
if (env === 'production') {
  // TODO
}


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API
app.get('/api/reviews', api.reviews);
app.get('/api/videos', api.videos);
app.get('/api/services', api.services);
app.get('/api/messages', api.viewMessages);
app.get('/api/starredMessages', api.viewStarred)
app.post('/api/messages/new', api.saveMessage);
app.put('/api/messages/:id', api.starMessage);
app.delete('/api/messages/:id', api.deleteMessage);

app.post('/api/login', function (req, res) {
    var userName = req.body.userName;
    var password = req.body.password;

    if (userName === "admin" && password === "bassethound") {
        var expires = new Date();
        expires.setDate((new Date()).getDate() + 5);
        var token = jwt.encode({
            userName: userName,
            expires: expires
        }, app.get('jwtTokenSecret'));

        tokens.push(token);

        res.send(200, { access_token: token, userName: userName });
    } else {
        res.send(401, "Invalid credentials");
    }
});
app.post('/api/logout', requiresAuthentication, function (req,res){
  var token= req.headers.access_token;
  removeFromTokens(token);
  res.send(200);
})

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
