import angular from 'angular';

import TweetsController from './tweets.controller.js';
import TweetsList from './tweets.component.js';

export default angular.module('tweets', [])
	.controller('TweetsController', TweetsController)
	.component('tweetsList', TweetsList)