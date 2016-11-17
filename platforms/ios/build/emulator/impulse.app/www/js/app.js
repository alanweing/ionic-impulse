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
  'impulse.services.feedbacks',
  'impulse.services.api',
  'impulse.controllers.sidemenu',
  'impulse.controllers.workshop',
  'impulse.controllers.group',
  'impulse.controllers.participants',
  'impulse.controllers.evaluations',
  'impulse.controllers.score',
  'impulse.controllers.ranking',
  'impulse.controllers.curricula'
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
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
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
      // controller: 'LoginController',
      templateUrl: 'templates/login.html',
      data: {
        requiresLogin: false
      }
    })
    .state('home', {
      url: '/home',
      controller: 'WorkshopsController',
      templateUrl: 'templates/home.html',
      data: {
        requiresLogin: true
      }})
    .state('workshop', {
      url: '/workshop/:id',
      templateUrl: 'templates/workshop.html',
      controller: 'WorkshopController'
    })
    .state('competences', {
      url: '/workshop/competences',
      templateUrl: 'templates/workshops/competences.html',
      controller: 'WorkshopController'
    })
    .state('group', {
      url: '/group',
      templateUrl: 'templates/group.html',
      controller: 'GroupController'
    })
    .state('feedbacks', {
      url: '/feedbacks',
      templateUrl: 'templates/feedbacks.html',
      controller: 'FeedbacksController'
    })
    .state('detailedFeedbacks', {
      url: '/detailedFeedbacks',
      templateUrl: 'templates/detailed-feedbacks.html',
      controller: 'FeedbacksController'
    })
    .state('workshopEvaluators', {
      url: '/workshopEvaluators',
      templateUrl: 'templates/workshop-evaluator.html',
      controller: 'WorkshopController'
    })
    .state('participants', {
      url: '/participants',
      templateUrl: 'templates/participants.html',
      controller: 'ParticipantsController'
    }).state('groups', {
      url: '/groups',
      templateUrl: 'templates/groups.html',
      controller: 'GroupController'
    })
    .state('myEvaluations', {
      url: 'myEvaluations',
      templateUrl: 'templates/myEvaluations.html',
      controller: 'EvaluationsController'
  })
    .state('score', {
      url: '/score',
      templateUrl: 'templates/myScore.html',
      controller: 'ScoreController'
    })
    .state('ranking', {
      url: '/ranking',
      templateUrl: 'templates/ranking.html',
      controller: 'RankingController'
    })
    .state('curricula', {
      url: '/curricula',
      templateUrl: 'templates/curricula.html',
      controller: 'CurriculaController'
    });

  $urlRouterProvider.otherwise('/login');

});

app.constant('globals', {
  // 'siteUrl': 'http://impulsecareers.com.br/',
  // 'apiUrl': 'http://impulsecareers.com.br/impulse_api/'
  'siteUrl': 'http://localhost:8000/',
  'apiUrl': 'http://localhost:8000/impulse_api/'
});
