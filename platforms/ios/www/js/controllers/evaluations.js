var app = angular.module('impulse.controllers.evaluations', []);

app.controller('EvaluationsController', function ($scope, ApiService)
{

  $scope.evaluations = [];

  $scope.refresh = function ()
  {
    ApiService.request('GET', 'evaluations')
      .then(function (response)
    {
      console.log(response);
      $scope.evaluations = response;
    });
  };

  $scope.refresh();

});
