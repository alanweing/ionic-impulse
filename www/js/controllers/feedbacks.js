var app = angular.module('impulse.controllers.feedbacks', []);

app.controller('FeedbacksController', function ($scope, $state, $localStorage, ApiService, FeedbacksService)
{
  $scope.model = FeedbacksService;
  $scope.name = $localStorage.name;
  $scope.feedbacks = [];

  $scope.setCurrentWorkshop = function (workshop)
  {
    FeedbacksService.setCurrentWorkshop(workshop);
    $state.go('detailedFeedbacks');
  };

  $scope.getCurrentWorkshop = function ()
  {
    return FeedbacksService.currentWorkshopFeedback;
  };

  $scope.refresh = function ()
  {
    $scope.$broadcast('scroll.refreshComplete');
    $scope.feedbacks = [];
    ApiService.request('GET', 'feedbacks')
      .then(function (response)
    {
      $scope.feedbacks = response;
    }, function (error)
    {
      // console.log(error);
    });
  };


});
