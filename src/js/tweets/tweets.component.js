import TweetsController from './tweets.controller.js';

var TweetsList = {
    bindings: {
        tweets     : "<",
        imageEnable: "<",
        limit      : "="
    },
    templateUrl : "tweets/tweets.html",
    controller  : TweetsController,
    controllerAs: "$tweets"
};

export default TweetsList;