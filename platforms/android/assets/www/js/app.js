var app = angular.module('impulse', [
  'ionic',
  'ngMessages',
  'ngCordova',
  'ngStorage',
  'impulse.controllers.authentication',
  'impulse.services.authentication',
  'impulse.controllers.workshops',
  'impulse.services.workshops',
  'impulse.controllers.feedbacks',
  'impulse.services.feedbacks'
]);

app.run(function($ionicPlatform)
{
  $ionicPlatform.ready(function()
  {
    if(window.cordova && window.cordova.plugins.Keyboard)
    {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      // cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar)
    {
      StatusBar.styleDefault();
    }
  });
});

app.config(function ($stateProvider, $urlRouterProvider)
{
  $stateProvider
    .state('login', {
      url: '/login',
      cache: false,
      controller: 'LoginController',
      templateUrl: 'templates/login.html',
      data: {
        requiresLogin: false
      }
    })
    .state('home', {
      url: '/home',
      // controller: 'WorkshopsController',
      templateUrl: 'templates/home.html',
      abstract: true,
      data: {
        requiresLogin: true
      }})
    .state('home.workshops', {
      url: '/workshops',
      views: {
        'tab-workshops': {
          templateUrl: 'templates/home/tab-workshops.html',
          controller: 'WorkshopsController'
        }
      }
    })
    .state('home.feedbacks', {
      url: '/feedbacks',
      views: {
        'tab-feedbacks': {
          templateUrl: 'templates/home/tab-feedbacks.html',
          controller: 'FeedbacksController'
        }
      }
    });

  $urlRouterProvider.otherwise('/login');

});

app.constant('globals', {
  'siteUrl': 'http://localhost:8000/',
  'apiUrl': 'http://localhost:8000/impulse_api/'
});
