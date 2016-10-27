var app = angular.module('impulse', [
  'ionic',
  'ngMessages',
  'ngCordova',
  'impulse.controllers.authentication',
  'impulse.services.authentication'
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
  $stateProvider.state('login', {
    url: '/login',
    cache: false,
    controller: 'LoginController',
    templateUrl: 'templates/login.html',
    data: {
      requiresLogin: false
    }
  });

  $urlRouterProvider.otherwise('/login');

});

