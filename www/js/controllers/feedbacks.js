var app = angular.module('impulse.controllers.feedbacks', []);

app.controller('FeedbacksController', function ($scope, $state, WorkshopsService, $localStorage)
{
  $scope.name = $localStorage.name;
});
