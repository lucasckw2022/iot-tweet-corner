var express       = require('express');
var app           = express();
var bodyParser    = require('body-parser');
var cors          = require('cors');
var functions     = require('./twitterOauth');
var port          = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.options("*", function(req,res,next){res.send(200);});
app.post('/authorize', functions.authorize);
app.post('/search', functions.search);
app.use(express.static(__dirname + '/build'))
app.get('/', (req, res)=>{
  res.sendFile(__dirname + '/build/index.html');
});
app.listen(port);
