import angular from 'angular';

import templates from './config/templates';
import main from './main/main.js';
import tweets from './tweets/tweets.js'

export default angular.module('app', ['main', 'templates', 'tweets']);