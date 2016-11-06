import angular from 'angular';

import MainController from './main.controller.js';
import MainComponent from './main.component.js';

export default angular.module('main', [])
	.controller('MainController', MainController)
	.component('mainComponent', MainComponent)