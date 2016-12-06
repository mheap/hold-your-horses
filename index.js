const GH_ACCESS_TOKEN = "YOUR_ACCESS_TOKEN";
const TIMEOUT_IN_SECONDS = 10;

//#########################################################

var restify = require('restify');
var request = require('request');
var HookReceiver = require('./src/HookReceiver');
var MergePreventer = require('./src/MergePreventer');

var server = restify.createServer();

server.use(restify.bodyParser());

server.post('/hook', function respond(req, res, next) {
    if (req.body.pull_request){
        var rec = new HookReceiver(req.body);
        var preventer = new MergePreventer(
            request,
            GH_ACCESS_TOKEN,
            rec.getOwner(),
            rec.getRepo(),
            rec.getSha()
        );

        preventer.trigger(TIMEOUT_IN_SECONDS * 1000,
            function(){ console.log("PENDING"); },
            function(){ console.log("COMPLETE"); }
        );
    }

    res.send(200);
    next();
});


server.listen(8080, "0.0.0.0", function() {
  console.log('%s listening at %s', server.name, server.url);
});
