var request = require('request');
var bearertoken;

functions = {
    authorize: function(req, res) {
        var twitterKey      = 'MgTmGdpz76tUC6ohRjE30dnJY',
            twitterSecret   = 'dDqouZKQraIOiWyOuhwPrj7oGGJ5egh5tazvojWGo20PTyWHC4',
            token           = '730432383124525057-Soaa5YBd9Oai1RdtLziaOIM4sQbBlSK',
            secret          = 'qDoYU8LBT8xokIqQfLqHGqqXoG5FlP4wexZJfVRgFMCuG',
            header          = twitterKey + ':' + twitterSecret,
            encheader       = new Buffer(header).toString('base64'),
            finalheader     = 'Basic ' + encheader;
        
        request.post('https://api.twitter.com/oauth2/token', {form: {'grant_type': 'client_credentials'}, 
        headers: {Authorization: finalheader}}, (error, response, body)=>{
            if(error) console.log(error);
            else {
                bearertoken = JSON.parse(body).access_token;
                res.json({success:true, token: bearertoken});
            }
        })
    },
    search: (req, res)=>{
        console.log(req.body)
        var searchquery     = req.body.q,
            encsearchquery  = encodeURIComponent(searchquery),
            bearerheader    = 'Bearer ' + bearertoken;

        request.get('https://api.twitter.com/1.1/search/tweets.json?q=filter%3Aimages%20AND%20%23iot%20AND%20' + encsearchquery +
         '&count=80&include_entities=true', {headers: {Authorization: bearerheader}}, function(error, body, response) {
             if(error)
             console.log(error);
             else {
                 res.json({success: true, data:JSON.parse(body.body)});
             }
         })
    }
}

module.exports = functions;